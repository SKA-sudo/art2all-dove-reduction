import * as THREE from "three";

/*
 * R5.4
 *
 * Longitudinal Axis Builder
 *
 * Erste semantische Beschreibung der
 * Längsachse einer gesamten Taube.
 *
 * Diese Version bestimmt ausschließlich
 * reproduzierbare Referenzpunkte.
 *
 * Noch keine anatomische Kopferkennung.
 */

export function buildLongitudinalAxis({ faces }) {
  if (!faces || faces.length === 0) {
    return null;
  }

  const bodyReference = findBodyReference(faces);
  const headReference = findHeadReference(faces);
  const tailReference = findTailReference(faces);

  const direction = headReference.center
    .clone()
    .sub(tailReference.center)
    .normalize();

  return {
    bodyReference,
    headReference,
    tailReference,
    direction,
  };
}

function findBodyReference(faces) {
  const center = new THREE.Vector3();

  faces.forEach((face) => {
    center.add(face.center);
  });

  center.divideScalar(faces.length);

  return faces.reduce((best, face) =>
    face.center.distanceTo(center) <
    best.center.distanceTo(center)
      ? face
      : best
  );
}

/*
 * Vorläufig:
 *
 * größtes Z = Kopfseite
 */
function findHeadReference(faces) {
  return faces.reduce((best, face) =>
    face.center.z > best.center.z
      ? face
      : best
  );
}

/*
 * Vorläufig:
 *
 * kleinstes Z = Schwanzseite
 */
function findTailReference(faces) {
  return faces.reduce((best, face) =>
    face.center.z < best.center.z
      ? face
      : best
  );
}