import * as THREE from "three";

function buildGestureForSide({ localWingSpace, primaryAxis, side }) {
  const wingItems = localWingSpace?.[side] ?? [];
  if (!wingItems.length) return null;

  const shoulder =
    side === "left" ? primaryAxis?.leftShoulder : primaryAxis?.rightShoulder;

  const wingTip =
    side === "left" ? primaryAxis?.leftWingTip : primaryAxis?.rightWingTip;

  if (!shoulder?.center || !wingTip?.center) return null;

  const root = shoulder.center.clone();
  const target = wingTip.center.clone();

  const mid = root.clone().lerp(target, 0.5);
  mid.y += 0.35;
  mid.z += 0.25;

  const curve = new THREE.QuadraticBezierCurve3(root, mid, target);

  return {
    id: `primary-gesture-${side}`,
    side,
    points: curve.getPoints(60),
    root,
    mid,
    target,
  };
}

export function buildPrimaryGestures({ localWingSpace, primaryAxis }) {
  return [
    buildGestureForSide({ localWingSpace, primaryAxis, side: "left" }),
    buildGestureForSide({ localWingSpace, primaryAxis, side: "right" }),
  ].filter(Boolean);
}