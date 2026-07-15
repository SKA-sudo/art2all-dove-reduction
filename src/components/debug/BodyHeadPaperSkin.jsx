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

    const bodyCenter = new THREE.Vector3();

    bodyFaces.forEach((face) => {
      bodyCenter.add(face.center);
    });

    bodyCenter.divideScalar(
      bodyFaces.length
    );

    const bodyBounds = new THREE.Box3();

    bodyFaces.forEach((face) => {
      bodyBounds.expandByPoint(face.center);
    });

    const bodyHeight = Math.max(
      bodyBounds.max.y - bodyBounds.min.y,
      Number.EPSILON
    );

    const nextPlacements = [];

    bodyFaces.forEach((face, index) => {
  if (index % 3 !== 0) {
    return;
  }

  const normal =
    face.normal instanceof THREE.Vector3
      ? face.normal.clone().normalize()
      : face.center
          .clone()
          .sub(bodyCenter)
          .normalize();

  if (
    normal.lengthSq() <= Number.EPSILON
  ) {
    normal.set(0, 0, 1);
  }

  const distance =
    face.center.distanceTo(
      bodyCenter
    );

  const size =
    THREE.MathUtils.lerp(
      0.045,
      0.095,
      1 -
        THREE.MathUtils.clamp(
          distance / 1.25,
          0,
          1
        )
    );

  /*
 * Ruhiger Verlauf über den Körper.
 *
 * Links leicht nach außen,
 * Mitte gerade,
 * rechts leicht nach außen.
 */
  const verticalProgress =
    (face.center.y - bodyBounds.min.y) /
    bodyHeight;

  /*
  * Drei einfache lokale Organisationszonen.
  *
  * Unterer Körper / Bauch
  * Mittlerer Körper / Brust
  * Oberer Körper / Halsansatz
  */
  let flow = 0;

  if (verticalProgress < 0.34) {
    flow = -10;
  } else if (verticalProgress < 0.68) {
    flow = 0;
  } else {
    flow = 10;
  }

nextPlacements.push({
    id: `body-face-paper-${index}`,

    position: face.center
      .clone()
      .addScaledVector(
        normal,
        0.008
      ),

    normal,

    rotation: 0,
    flow,

    scale: [
      size,
      size * 0.65,
      1,
    ],

    image:
      DRAWINGS[
        index % DRAWINGS.length
      ],
  });
});

    return nextPlacements;
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