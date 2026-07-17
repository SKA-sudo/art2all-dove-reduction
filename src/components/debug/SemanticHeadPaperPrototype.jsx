import { useMemo } from "react";

import Paper from "../Paper";
import {
  createSemanticSurface,
} from "../../core/perception/SemanticSurface";
import {
  computeSemanticSurfaceMetrics,
} from "../../core/perception/SemanticSurfaceMetrics";
import {
  buildSemanticClusters,
} from "../../core/perception/SemanticClusterBuilder";

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

    return computeSemanticSurfaceMetrics(
      surface,
      {
        neighbourCount: 6,
      }
    );
  }, [region]);

  /*
   * Erste rein räumliche Clusterbildung.
   *
   * Noch keine semantische Bewertung.
   */
  const clusterExperiments = useMemo(() => {
  const densityThresholds = [
    20,
    40,
    60,
    80,
    120,
    200,
  ];

  return densityThresholds.map(
    (maxDensityDifference) => {
      const experimentClusters =
        buildSemanticClusters(
          semanticSurface,
          {
            maxDistance: 0.006,
            maxDensityDifference,
          }
        );

      const sortedClusters = [
        ...experimentClusters,
      ].sort(
        (a, b) =>
          b.elementCount - a.elementCount
      );

      const largestCluster =
        sortedClusters[0] ?? null;

      return {
        maxDensityDifference,
        clusters: experimentClusters,
        clusterCount:
          experimentClusters.length,
        largestClusterSize:
          largestCluster?.elementCount ?? 0,
        largestClusterShare:
          semanticSurface.elements.length > 0
            ? (
                (largestCluster?.elementCount ?? 0) /
                semanticSurface.elements.length
              ) * 100
            : 0,
      };
    }
  );
}, [semanticSurface]);

console.table(
  clusterExperiments.map(
    (experiment) => ({
      maxDistance: "0.0060",

      maxDensityDifference:
        experiment.maxDensityDifference,

      clusterCount:
        experiment.clusterCount,

      largestCluster:
        experiment.largestClusterSize,

      largestClusterShare:
        `${experiment.largestClusterShare.toFixed(1)} %`,
    })
  )
);

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

  if (semanticSurface.elements.length === 0) {
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