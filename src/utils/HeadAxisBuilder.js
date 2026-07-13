import * as THREE from "three";

export function buildHeadAxis({ faces }) {
  const validFaces = getValidFaces(faces);

  if (validFaces.length === 0) {
    return null;
  }

  const center = computeCenter(validFaces);

  const rear = findExtreme(validFaces, "minZ");
  const front = findExtreme(validFaces, "maxZ");

  const direction = front
    .clone()
    .sub(rear)
    .normalize();

  return {
    rear,
    center,
    front,
    direction,
  };
}

function getValidFaces(faces) {
  if (!Array.isArray(faces)) {
    return [];
  }

  return faces.filter(
    (face) =>
      face?.center instanceof THREE.Vector3
  );
}

function computeCenter(faces) {
  const center = new THREE.Vector3();

  faces.forEach((face) => {
    center.add(face.center);
  });

  center.divideScalar(faces.length);

  return center;
}

function findExtreme(faces, mode) {
  const initial = faces[0].center;

  return faces.reduce((best, face) => {
    const candidate = face.center;

    if (mode === "minZ") {
      return candidate.z < best.z
        ? candidate
        : best;
    }

    return candidate.z > best.z
      ? candidate
      : best;
  }, initial);
}