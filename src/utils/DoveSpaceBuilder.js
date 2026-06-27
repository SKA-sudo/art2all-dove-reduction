export function findPrimaryDoveAxis(faces) {
  if (!faces || faces.length === 0) return null;

  const leftWingTip = faces.reduce((best, face) =>
    face.center.x < best.center.x ? face : best
  );

  const rightWingTip = faces.reduce((best, face) =>
    face.center.x > best.center.x ? face : best
  );

  const bodyCenter = faces.reduce((best, face) =>
    Math.abs(face.center.x) < Math.abs(best.center.x) ? face : best
  );

  const leftTransition = findTransitionZonePoint(
    faces,
    bodyCenter,
    leftWingTip,
    "left"
  );

  const rightTransition = findTransitionZonePoint(
    faces,
    bodyCenter,
    rightWingTip,
    "right"
  );

  return {
    leftWingTip,
    leftShoulder: leftTransition,
    bodyCenter,
    rightShoulder: rightTransition,
    rightWingTip,
  };
}

function findTransitionZonePoint(faces, bodyCenter, wingTip, side) {
  const body = bodyCenter.center;
  const tip = wingTip.center;

  const minX = Math.min(body.x, tip.x);
  const maxX = Math.max(body.x, tip.x);

  const candidates = faces.filter((face) => {
    const x = face.center.x;

    if (x < minX || x > maxX) return false;

    // Übergangszone: näher am Körper als an der Flügelspitze
    const t = Math.abs((x - body.x) / (tip.x - body.x));

    return t > 0.18 && t < 0.42;
  });

  if (!candidates.length) {
    return side === "left" ? wingTip : bodyCenter;
  }

  return candidates.reduce((best, face) => {
    const bestScore = transitionScore(best, body, tip);
    const score = transitionScore(face, body, tip);

    return score < bestScore ? face : best;
  });
}

function transitionScore(face, body, tip) {
  const p = face.center;

  // Position entlang Body → WingTip
  const t = Math.abs((p.x - body.x) / (tip.x - body.x));

  // Zielbereich: ca. erstes Drittel vom Körper aus
  const targetT = 0.30;

  // Körper-Schulter liegt eher leicht oberhalb der Körpermitte
  const yPreference = Math.abs(p.y - body.y) * 0.15;

  return Math.abs(t - targetT) + yPreference;
}