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

    const nextPlacements = [];

    bodyFaces.forEach((face, index) => {
      /*
       * Erster einfacher Surface-PoC:
       * Nur jedes vierte Face erhält ein Papier.
       */
      if (index % 4 !== 0) {
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
        flow: 0,

        scale: [
          0.085,
          0.055,
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