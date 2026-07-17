import { useMemo } from "react";

import Paper from "../Paper";
import {
  createSemanticSurface,
} from "../../core/perception/SemanticSurface";
import {
  computeSemanticSurfaceMetrics,
} from "../../core/perception/SemanticSurfaceMetrics";
import SemanticSurfaceMetricsDebug from "./SemanticSurfaceMetricsDebug";


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
  const surface = createSemanticSurface({
    region,
    regionId: "head",
  });

  const surfaceWithMetrics =
    computeSemanticSurfaceMetrics(surface, {
      neighbourCount: 6,
    });

const densityValues =
  surfaceWithMetrics.elements
    .map((element) => element.metrics.localDensity)
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

const densitySum = densityValues.reduce(
  (sum, value) => sum + value,
  0
);

const densityAverage =
  densityValues.length > 0
    ? densitySum / densityValues.length
    : 0;

const densityMedian =
  densityValues.length === 0
    ? 0
    : densityValues.length % 2 === 0
      ? (
          densityValues[densityValues.length / 2 - 1] +
          densityValues[densityValues.length / 2]
        ) / 2
      : densityValues[
          Math.floor(densityValues.length / 2)
        ];

console.table({
  region: surfaceWithMetrics.regionId,
  elementCount: densityValues.length,
  minimumDensity: densityValues[0]?.toFixed(4) ?? "0",
  maximumDensity:
    densityValues[densityValues.length - 1]?.toFixed(4) ?? "0",
  averageDensity: densityAverage.toFixed(4),
  medianDensity: densityMedian.toFixed(4),
});
  

  return surfaceWithMetrics;
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
  <group>
  {/*
{placements.map((paper) => (
  <Paper
    key={paper.id}
    {...paper}
  />
))}
*/}

    <SemanticSurfaceMetricsDebug
      semanticSurface={semanticSurface}
      pointSize={0.018}
    />
  </group>
  );
}