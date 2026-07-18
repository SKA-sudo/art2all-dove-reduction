import * as THREE from "three";

import SemanticObservation from "../SemanticObservation";

export default class BeakExtractor {
  constructor({
    id = "beak-extractor",
  } = {}) {
    this.id = id;
  }

  extract({
    headRegionObservation,
    longitudinalAxisObservation,
  } = {}) {
    const headRegion =
      headRegionObservation?.value ?? null;

    const faces = Array.isArray(headRegion?.faces)
      ? headRegion.faces.filter(
          (face) =>
            face?.center instanceof THREE.Vector3
        )
      : [];

    const axisDirection =
      longitudinalAxisObservation?.value?.direction ??
      longitudinalAxisObservation?.direction ??
      null;

    const hasDirection =
      axisDirection instanceof THREE.Vector3 &&
      axisDirection.lengthSq() > Number.EPSILON;

    if (faces.length === 0 || !hasDirection) {
      return new SemanticObservation({
        id: crypto.randomUUID(),

        subject: "HeadRegion",
        predicate: "HAS_BEAK",

        value: null,

        source: this.id,
        confidence: 0.0,
      });
    }

    const direction = axisDirection
      .clone()
      .normalize();

    const headCenter = computeCenter(faces);

    const tipFace = findForwardFace({
      faces,
      origin: headCenter,
      direction,
    });

    const tip = tipFace.center.clone();

    const length = Math.max(
      0,
      tip
        .clone()
        .sub(headCenter)
        .dot(direction)
    );

    const center = headCenter
      .clone()
      .addScaledVector(
        direction,
        length * 0.5
      );

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "HeadRegion",
      predicate: "HAS_BEAK",

      value: {
        center,
        tip,
        direction,
        length,

        tipFace,
        faceCount: faces.length,
      },

      source: this.id,
      confidence: length > Number.EPSILON
        ? 1.0
        : 0.0,
    });
  }
}

function computeCenter(faces) {
  const center = new THREE.Vector3();

  faces.forEach((face) => {
    center.add(face.center);
  });

  return center.divideScalar(faces.length);
}

function findForwardFace({
  faces,
  origin,
  direction,
}) {
  return faces.reduce((bestFace, face) => {
    const bestProgress = bestFace.center
      .clone()
      .sub(origin)
      .dot(direction);

    const faceProgress = face.center
      .clone()
      .sub(origin)
      .dot(direction);

    return faceProgress > bestProgress
      ? face
      : bestFace;
  });
}