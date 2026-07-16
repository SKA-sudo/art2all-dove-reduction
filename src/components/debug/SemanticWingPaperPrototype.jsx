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

const SAMPLE_STEP = 6;

export default function SemanticWingPaperPrototype({
  wingItems = [],
}) {
  const placements = useMemo(() => {
    return wingItems
      .filter(
        (item, index) =>
          index % SAMPLE_STEP === 0 &&
          item?.center instanceof
            THREE.Vector3 &&
          item?.normal instanceof
            THREE.Vector3 &&
          item?.flow instanceof
            THREE.Vector3
      )
      .map((item, index) => {
        const progress =
          THREE.MathUtils.clamp(
            item.wingProgress ?? 0,
            0,
            1
          );

        /*
         * Schulter etwas größer,
         * Flügelspitze etwas schmaler.
         */
        const width =
          THREE.MathUtils.lerp(
            0.095,
            0.055,
            progress
          );

        const height =
          THREE.MathUtils.lerp(
            0.065,
            0.035,
            progress
          );

        return {
          id:
            item.face?.id ??
            `semantic-wing-paper-${index}`,

          position: item.center
            .clone()
            .addScaledVector(
              item.normal,
              0.008
            ),

          normal:
            item.normal.clone(),

          flowDirection:
            item.flow.clone(),

          scale: [
            width,
            height,
            1,
          ],

          image:
            DRAWINGS[
              index % DRAWINGS.length
            ],
        };
      });
  }, [wingItems]);

  if (placements.length === 0) {
    return null;
  }

  return (
    <group renderOrder={1900}>
      {placements.map((placement) => (
        <Paper
          key={placement.id}
          position={placement.position}
          normal={placement.normal}
          flowDirection={
            placement.flowDirection
          }
          rotation={0}
          image={placement.image}
          scale={placement.scale}
        />
      ))}
    </group>
  );
}