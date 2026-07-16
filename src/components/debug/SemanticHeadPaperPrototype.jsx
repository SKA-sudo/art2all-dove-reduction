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

const SAMPLE_STEP = 3;

export default function SemanticHeadPaperPrototype({
  region,
}) {
  const placements = useMemo(() => {
    const faces =
      region?.faces?.filter(
        (face) =>
          face?.center instanceof THREE.Vector3 &&
          face?.normal instanceof THREE.Vector3
      ) ?? [];

    return faces
      .filter(
        (_, index) =>
          index % SAMPLE_STEP === 0
      )
      .map((face, index) => ({
        id:
          face.id ??
          `semantic-head-paper-${index}`,

        position: face.center
          .clone()
          .addScaledVector(
            face.normal,
            0.006
          ),

        normal: face.normal.clone(),

        scale: [
          0.045,
          0.032,
          1,
        ],

        image:
          DRAWINGS[
            index % DRAWINGS.length
          ],
      }));
  }, [region]);

  if (placements.length === 0) {
    return null;
  }

  return (
    <group renderOrder={1950}>
      {placements.map((placement) => (
        <Paper
          key={placement.id}
          position={placement.position}
          normal={placement.normal}
          rotation={0}
          image={placement.image}
          scale={placement.scale}
        />
      ))}
    </group>
  );
}