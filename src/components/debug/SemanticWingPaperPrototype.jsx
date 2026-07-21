import { useMemo } from "react";

import Paper from "../Paper";
import {
  createSemanticSurfacePaperPlacements,
} from "../../core/perception/adapters/SemanticSurfacePaperAdapter";

const DRAWINGS = [
  "/drawings/demo/herz.png",
  "/drawings/demo/familie.png",
  "/drawings/demo/sonne.png",
  "/drawings/demo/regenbogen.png",
  "/drawings/demo/Peace-hand.png",
];

export default function SemanticWingPaperPrototype({
  semanticSurfaces = [],
}) {
  const placements = useMemo(() => {
    return semanticSurfaces.flatMap(
      (semanticSurface) =>
        createSemanticSurfacePaperPlacements(
          semanticSurface,
          {
            drawings: DRAWINGS,
            sampleStep: 1,
            surfaceOffset: 0.008,
            scale: [0.075, 0.05, 1],
            idPrefix:
              semanticSurface.regionId,
          }
        )
    );
  }, [semanticSurfaces]);

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
          rotation={0}
          image={placement.image}
          scale={placement.scale}
        />
      ))}
    </group>
  );
}