import * as THREE from "three";

export function uniformPriority(point, bounds) {
  const height = Math.max(
    bounds.max.y - bounds.min.y,
    Number.EPSILON
  );

  return (point.y - bounds.min.y) / height;
}

export function silhouettePriority(point, bounds) {
  const center = new THREE.Vector3();
  bounds.getCenter(center);

  const maxRadius = Math.max(
    center.distanceTo(bounds.max),
    Number.EPSILON
  );

  const distance = point.distanceTo(center);

  return Math.min(distance / maxRadius, 1);
}

export function headPriority() {
  return 0;
}

export function wingPriority() {
  return 0;
}

export function bodyPriority() {
  return 0;
}