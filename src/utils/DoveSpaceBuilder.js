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
    leftShoulder: leftTransition.point,
    leftTransitionRegion: leftTransition.region,


    bodyCenter,

    rightShoulder: rightTransition.point,
    rightTransitionRegion: rightTransition.region,
    rightWingTip,
  };
}

function findTransitionZonePoint(faces, bodyCenter, wingTip, side) {
  const body = bodyCenter.center;
  const tip = wingTip.center;

  const axis = {
    x: tip.x - body.x,
    y: tip.y - body.y,
    z: tip.z - body.z,
  };

  const axisLengthSq =
    axis.x * axis.x + axis.y * axis.y + axis.z * axis.z;

  if (axisLengthSq === 0) {
    return { point: bodyCenter, region: [] };
  }

  const candidates = faces.filter((face) => {
    const p = face.center;

    const rel = {
      x: p.x - body.x,
      y: p.y - body.y,
      z: p.z - body.z,
    };

    const t =
      (rel.x * axis.x + rel.y * axis.y + rel.z * axis.z) /
      axisLengthSq;

    if (t < 0.18 || t > 0.46) return false;

    const projected = {
      x: body.x + axis.x * t,
      y: body.y + axis.y * t,
      z: body.z + axis.z * t,
    };

    const dx = p.x - projected.x;
    const dy = p.y - projected.y;
    const dz = p.z - projected.z;

    const distanceToAxis = Math.sqrt(dx * dx + dy * dy + dz * dz);

    return distanceToAxis < 3.8;
  });

  if (!candidates.length) {
    return {
      point: side === "left" ? wingTip : bodyCenter,
      region: [],
    };
  }

  const point = candidates.reduce((best, face) => {
    const bestScore = transitionScore(best, body, tip);
    const score = transitionScore(face, body, tip);

    return score < bestScore ? face : best;
  });

  return {
    point,
    region: candidates,
  };
}

function transitionScore(face, body, tip) {
  const p = face.center;

  const axis = {
    x: tip.x - body.x,
    y: tip.y - body.y,
    z: tip.z - body.z,
  };

  const rel = {
    x: p.x - body.x,
    y: p.y - body.y,
    z: p.z - body.z,
  };

  const axisLengthSq =
    axis.x * axis.x + axis.y * axis.y + axis.z * axis.z;

  const t =
    axisLengthSq === 0
      ? 0
      : (rel.x * axis.x + rel.y * axis.y + rel.z * axis.z) /
        axisLengthSq;

  const targetT = 0.32;

  const projected = {
    x: body.x + axis.x * t,
    y: body.y + axis.y * t,
    z: body.z + axis.z * t,
  };

  const dx = p.x - projected.x;
  const dy = p.y - projected.y;
  const dz = p.z - projected.z;

  const distanceToAxis = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const bodyDistance = Math.abs(p.x - body.x);

  return (
    Math.abs(t - targetT) * 2.0 +
    distanceToAxis * 0.18 +
    bodyDistance * 0.03
  );
}
function createLocalWingSpace(shoulder, wingTip) {
  if (!shoulder || !wingTip) return null;

  const start = shoulder.center;
  const end = wingTip.center;

  const axis = {
    x: end.x - start.x,
    y: end.y - start.y,
    z: end.z - start.z,
  };

  const length = Math.sqrt(
    axis.x * axis.x +
    axis.y * axis.y +
    axis.z * axis.z
  );

  if (length === 0) return null;

  return {
    shoulder,
    wingTip,
    axis: {
      x: axis.x / length,
      y: axis.y / length,
      z: axis.z / length,
    },
    length,
  };
}