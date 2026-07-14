import * as THREE from "three";

export let HEAD_REGION_START = 0.92;
export let HEAD_REGION_END = 1.0;

const TAIL_REGION_START = 0.0;
const TAIL_REGION_END = 0.08;
const BODY_REGION_START = 0.16;
const BODY_REGION_END = 0.84;
const BODY_RADIUS_PERCENTILE = 0.45;

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

const bodyRegion = buildBodyRegion({
  faces: validFaces,
  axisStart: initialTailReference.center,
  axis: initialAxis,
  axisLengthSq,
});


if (
  headRegion.faces.length === 0 ||
  bodyRegion.faces.length === 0 ||
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
      bodyRegion,

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

function buildBodyRegion({
  faces,
  axisStart,
  axis,
  axisLengthSq,
}) {
  const normalizedAxis = axis
    .clone()
    .normalize();

  const centralFaces = faces.filter((face) => {
    const relativePosition = face.center
      .clone()
      .sub(axisStart);

    const progress =
      relativePosition.dot(axis) /
      axisLengthSq;

    return (
      progress >= BODY_REGION_START &&
      progress <= BODY_REGION_END
    );
  });

  if (centralFaces.length === 0) {
    return {
      progressMin: BODY_REGION_START,
      progressMax: BODY_REGION_END,
      faces: [],
    };
  }

  const facesWithRadius = centralFaces.map((face) => {
    const relativePosition = face.center
      .clone()
      .sub(axisStart);

    const axisDistance =
      relativePosition.dot(normalizedAxis);

    const axisPoint = axisStart
      .clone()
      .addScaledVector(
        normalizedAxis,
        axisDistance
      );

    return {
      face,
      radiusSq:
        face.center.distanceToSquared(axisPoint),
    };
  });

  const sortedRadii = facesWithRadius
    .map(({ radiusSq }) => radiusSq)
    .sort((a, b) => a - b);

  const radiusIndex = Math.min(
    sortedRadii.length - 1,
    Math.floor(
      sortedRadii.length *
        BODY_RADIUS_PERCENTILE
    )
  );

  const radiusLimitSq =
    sortedRadii[radiusIndex];

  const bodyFaces = facesWithRadius
    .filter(
      ({ radiusSq }) =>
        radiusSq <= radiusLimitSq
    )
    .map(({ face }) => face);

  return {
    progressMin: BODY_REGION_START,
    progressMax: BODY_REGION_END,
    radiusPercentile:
      BODY_RADIUS_PERCENTILE,
    faces: bodyFaces,
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