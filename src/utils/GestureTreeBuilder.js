import * as THREE from "three";

function buildFlowCurvesFromGesture(gesture, side) {
  if (!gesture?.points?.length) return [];

  const sampleCount = 4;
  const direction = side === "left" ? -1 : 1;

  return Array.from({ length: sampleCount }, (_, index) => {
    const t = (index + 1) / (sampleCount + 1);
    const sourceIndex = Math.floor(t * (gesture.points.length - 1));

    const source = gesture.points[sourceIndex].clone();

    const target = source.clone();
    target.x += direction * (0.7 + index * 0.22);
    target.y += 0.25 + index * 0.12;
    target.z += 0.15;

    const mid = source.clone().lerp(target, 0.5);
    mid.y += 0.25;
    mid.z += 0.2;

    const curve = new THREE.QuadraticBezierCurve3(source, mid, target);

    return {
      id: `gesture-tree-flow-${side}-${index}`,
      side,
      points: curve.getPoints(30),
      source,
      mid,
      target,
    };
  });
}

export function buildGestureTreeDebug({ primaryGestures }) {
  if (!primaryGestures?.length) return [];

  return primaryGestures.flatMap((gesture) =>
    buildFlowCurvesFromGesture(gesture, gesture.side)
  );
}