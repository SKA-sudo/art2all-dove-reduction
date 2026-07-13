import * as THREE from "three";

export let HEAD_REGION_START = 0.92;
export let HEAD_REGION_END = 1.0;

const TAIL_REGION_START = 0.0;
const TAIL_REGION_END = 0.08;

export function setHeadRegion(start, end) {
  HEAD_REGION_START = start;
  HEAD_REGION_END = end;
}

/*
 * R5.5 – Semantic Regions on the Longitudinal Axis
 *
 * Die Längsachse wird weiterhin aus den extremen
 * Bereichen der Taube abgeleitet.
 *
 * Neu:
 *
 * Kopf und Schwanz werden nicht mehr durch jeweils
 * ein einzelnes Face repräsentiert.
 *
 * Stattdessen werden kleine Regionen entlang der
 * Longitudinal Axis gebildet und daraus stabile
 * Referenzzentren berechnet.
 */

export function buildLongitudinalAxis({ faces }) {
  const validFaces = getValidFaces(faces);

  if (validFaces.length === 0) {
    return null;
  }

  const bodyReference =
    findBodyReference(validFaces);

  const initialTailReference =
    findExtremeReference(validFaces, "min");

  const initialHeadReference =
    findExtremeReference(validFaces, "max");

  const initialAxis = initialHeadReference.center
    .clone()
    .sub(initialTailReference.center);

  const axisLengthSq = initialAxis.lengthSq();

  if (axisLengthSq <= Number.EPSILON) {
    return null;
  }

  const headRegion = buildSemanticRegion({
    faces: validFaces,
    axisStart: initialTailReference.center,
    axis: initialAxis,
    axisLengthSq,
    progressMin: HEAD_REGION_START,
    progressMax: HEAD_REGION_END,
  });

  const tailRegion = buildSemanticRegion({
  faces: validFaces,
  axisStart: initialTailReference.center,
  axis: initialAxis,
  axisLengthSq,
  progressMin: TAIL_REGION_START,
  progressMax: TAIL_REGION_END,
});


if (
  headRegion.faces.length === 0 ||
  tailRegion.faces.length === 0
) {
  return null;
}

  const headReference =
    createRegionReference(headRegion);

  const tailReference =
    createRegionReference(tailRegion);

  const direction = headReference.center
    .clone()
    .sub(tailReference.center)
    .normalize();

  return {
    bodyReference,

    headRegion,
    headReference,

    tailRegion,
    tailReference,

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

function findBodyReference(faces) {
  const center = new THREE.Vector3();

  faces.forEach((face) => {
    center.add(face.center);
  });

  center.divideScalar(faces.length);

  return faces.reduce((best, face) =>
    face.center.distanceToSquared(center) <
    best.center.distanceToSquared(center)
      ? face
      : best
  );
}

function findExtremeReference(faces, mode) {
  return faces.reduce((best, face) => {
    if (mode === "min") {
      return face.center.z < best.center.z
        ? face
        : best;
    }

    return face.center.z > best.center.z
      ? face
      : best;
  });
}

function buildSemanticRegion({
  faces,
  axisStart,
  axis,
  axisLengthSq,
  progressMin,
  progressMax,
}) {
  const regionFaces = faces.filter((face) => {
    const relativePosition = face.center
      .clone()
      .sub(axisStart);

    const progress =
      relativePosition.dot(axis) /
      axisLengthSq;

    return (
      progress >= progressMin &&
      progress <= progressMax
    );
  });

  return {
    progressMin,
    progressMax,
    faces: regionFaces,
  };
}

function createRegionReference(region) {
  const center = new THREE.Vector3();

  region.faces.forEach((face) => {
    center.add(face.center);
  });

  center.divideScalar(region.faces.length);

  return {
    center,
    faceCount: region.faces.length,
  };
}