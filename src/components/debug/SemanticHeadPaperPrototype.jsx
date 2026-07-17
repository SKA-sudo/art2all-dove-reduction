import { useMemo } from "react";

import Paper from "../Paper";
import {
  createSemanticSurface,
} from "../../core/perception/SemanticSurface";

const DRAWINGS = [
  "/drawings/demo/herz.png",
  "/drawings/demo/familie.png",
  "/drawings/demo/sonne.png",
  "/drawings/demo/regenbogen.png",
  "/drawings/demo/Peace-hand.png",
];

const SAMPLE_STEP = 3;
const SURFACE_OFFSET = 0.006;

export default function SemanticHeadPaperPrototype({
  region,
}) {
  /*
   * Universelle semantische Oberfläche.
   *
   * Diese Struktur enthält keine Paper-
   * oder Rendering-Verantwortung.
   */
  const semanticSurface = useMemo(() => {
    return createSemanticSurface({
      region,
      regionId: "head",
    });
  }, [region]);

  /*
   * Paper ist lediglich der erste Verbraucher
   * der universellen Semantic Surface.
   */
  const placements = useMemo(() => {
    return semanticSurface.elements
      .filter(
        (_, index) =>
          index % SAMPLE_STEP === 0
      )
      .map((surfaceElement, index) => ({
        id: `head-paper-${surfaceElement.id}`,

        position: surfaceElement.position
          .clone()
          .addScaledVector(
            surfaceElement.normal,
            SURFACE_OFFSET
          ),

        normal: surfaceElement.normal.clone(),

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
  }, [semanticSurface]);

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