import * as THREE from "three";

/*
 * R5.3c – validated reference-model orientation
 *
 * X: left wing <-> right wing
 * Y: belly <-> back
 * Z: tail <-> head
 *
 * The longitudinal debug validation showed:
 * minZ = tail side
 * maxZ = head side
 *
 * This reference therefore represents the head-side
 * endpoint of the validated longitudinal axis.
 */
export const HEAD_PRIORITY_CENTER_NORMALIZED =
  new THREE.Vector3(0.5, 0.5, 1.0);

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

export function headPriority(point, bounds) {
  const width = Math.max(
    bounds.max.x - bounds.min.x,
    Number.EPSILON
  );

  const height = Math.max(
    bounds.max.y - bounds.min.y,
    Number.EPSILON
  );

  const depth = Math.max(
    bounds.max.z - bounds.min.z,
    Number.EPSILON
  );

  const normalizedPoint = new THREE.Vector3(
    (point.x - bounds.min.x) / width,
    (point.y - bounds.min.y) / height,
    (point.z - bounds.min.z) / depth
  );

  const distance = normalizedPoint.distanceTo(
    HEAD_PRIORITY_CENTER_NORMALIZED
  );

  return THREE.MathUtils.clamp(
    1 - distance / 0.22,
    0,
    1
  );
}

export function wingPriority() {
  return 0;
}

export function bodyPriority() {
  return 0;
}