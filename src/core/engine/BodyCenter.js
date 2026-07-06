import * as THREE from "three";

export function calculateBodyCenter(faces) {
  if (!faces || faces.length === 0) return null;

  const center = new THREE.Vector3();

  faces.forEach((face) => {
    center.add(face.center);
  });

  center.divideScalar(faces.length);

  return center;
}