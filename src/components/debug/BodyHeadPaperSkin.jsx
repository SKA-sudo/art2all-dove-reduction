import { useMemo } from "react";
import * as THREE from "three";

import Paper from "../Paper";

const DRAWINGS = [
  "/drawings/demo/herz.png",
  "/drawings/demo/familie.png",
  "/drawings/demo/sonne.png",
  "/drawings/demo/regenbogen.png",
  "/drawings/demo/Peace-hand.png",
];

/**
 * Erzeugt eine virtuelle Papierreihe.
 *
 * Die Reihe wird zuerst unabhängig von den Mesh-Faces
 * konstruiert. Die Projektion auf die Körperoberfläche
 * folgt im nächsten Schritt.
 */
function buildPaperRow({
  center,
  direction,
  width,
  count,
  normal = new THREE.Vector3(0, 0, 1),
  surfaceOffset = 0.008,
}) {
  if (
    !(center instanceof THREE.Vector3) ||
    !(direction instanceof THREE.Vector3) ||
    count <= 0 ||
    width <= 0
  ) {
    return [];
  }

  const rowDirection = direction.clone();

  if (rowDirection.lengthSq() <= Number.EPSILON) {
    return [];
  }

  rowDirection.normalize();

  const rowNormal = normal.clone();

  if (rowNormal.lengthSq() <= Number.EPSILON) {
    rowNormal.set(0, 0, 1);
  }

  rowNormal.normalize();

  return Array.from(
    { length: count },
    (_, index) => {
      const progress =
        count > 1
          ? index / (count - 1)
          : 0.5;

      const signedOffset =
        (progress - 0.5) * width;

      const position = center
        .clone()
        .addScaledVector(
          rowDirection,
          signedOffset
        )
        .addScaledVector(
          rowNormal,
          surfaceOffset
        );

      return {
        id: `body-test-row-${index}`,
        position,
        normal: rowNormal.clone(),
        flow: 0,
        rotation: 0,
        scale: [0.105, 0.066, 1],
        image:
          DRAWINGS[index % DRAWINGS.length],
      };
    }
  );
}

export default function BodyHeadPaperSkin({
  bodyRegion,
}) {
  const placements = useMemo(() => {
    const bodyFaces =
      bodyRegion?.faces?.filter(
        (face) =>
          face?.center instanceof THREE.Vector3
      ) ?? [];

    if (bodyFaces.length === 0) {
      return [];
    }

    /*
     * Mittelpunkt der vorhandenen semantischen
     * Body Region bestimmen.
     */
    const bodyCenter = new THREE.Vector3();

    bodyFaces.forEach((face) => {
      bodyCenter.add(face.center);
    });

    bodyCenter.divideScalar(
      bodyFaces.length
    );

    /*
     * R7.0.2:
     *
     * Eine einzelne virtuelle Papierreihe.
     *
     * Noch keine Face-Auswahl.
     * Noch keine Oberflächenprojektion.
     * Noch kein Kopf.
     */
    return buildPaperRow({
      center: bodyCenter,

      /*
       * Erste Testreihe entlang der lokalen X-Achse.
       */
      direction: new THREE.Vector3(
        1,
        0,
        0
      ),

      /*
       * Die Reihe zeigt zunächst zur Kameraebene.
       */
      normal: new THREE.Vector3(
        0,
        0,
        1
      ),

      width: 0.75,
      count: 7,
      surfaceOffset: 0.02,
    });
  }, [bodyRegion]);

  if (placements.length === 0) {
    return null;
  }

  return (
    <group renderOrder={1600}>
      {placements.map((placement) => (
        <Paper
          key={placement.id}
          position={placement.position}
          normal={placement.normal}
          flow={placement.flow}
          rotation={placement.rotation}
          image={placement.image}
          scale={placement.scale}
        />
      ))}
    </group>
  );
}