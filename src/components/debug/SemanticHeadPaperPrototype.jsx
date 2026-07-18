import { useMemo } from "react";

import Paper from "../Paper";

import {
  buildSemanticClusters,
} from "../../core/perception/SemanticClusterBuilder";

import {
  createSemanticSurfacePaperPlacements,
} from "../../core/perception/adapters/SemanticSurfacePaperAdapter";

import SemanticSurfaceMetricsDebug from "./SemanticSurfaceMetricsDebug";

const DRAWINGS = [
  "/drawings/demo/herz.png",
  "/drawings/demo/familie.png",
  "/drawings/demo/sonne.png",
  "/drawings/demo/regenbogen.png",
  "/drawings/demo/Peace-hand.png",
];

export default function SemanticHeadPaperPrototype({
  semanticSurface,
}) {
  if (
    !semanticSurface ||
    !Array.isArray(semanticSurface.elements)
  ) {
    return null;
  }

  /*
   * Experimentelle Clusteranalyse.
   *
   * Die Ergebnisse bleiben rein beobachtend
   * und beeinflussen die Paper-Platzierung nicht.
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
            b.elementCount -
            a.elementCount
        );

        const largestCluster =
          sortedClusters[0] ?? null;

        return {
          maxDensityDifference,

          clusterCount:
            experimentClusters.length,

          largestClusterSize:
            largestCluster?.elementCount ??
            0,

          largestClusterShare:
            semanticSurface.elements.length >
            0
              ? (
                  (largestCluster?.elementCount ??
                    0) /
                  semanticSurface.elements
                    .length
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
          `${experiment.largestClusterShare.toFixed(
            1
          )} %`,
      })
    )
  );

  /*
   * Der Adapter übersetzt die Semantic Surface
   * in renderer-neutrale Paper-Placement-Daten.
   */
  const placements = useMemo(() => {
    return createSemanticSurfacePaperPlacements(
      semanticSurface,
      {
        drawings: DRAWINGS,
        sampleStep: 100,
        surfaceOffset: 0.012,
        scale: [
          0.12,
          0.08,
          1,
        ],
        idPrefix: "head-paper",
      }
    );
  }, [semanticSurface]);
console.log(
  "[SemanticHeadPaperPrototype]",
  {
    surfaceElements:
      semanticSurface.elements.length,
    placements: placements.length,
    firstPlacement:
      placements[0] ?? null,
  }
);
  if (
    semanticSurface.elements.length === 0
  ) {
    return null;
  }

  return (
    <group>
      {placements.map((paper) => (
        <Paper
          key={paper.id}
          {...paper}
        />
      ))}

      {/*
      <SemanticSurfaceMetricsDebug
        semanticSurface={semanticSurface}
        pointSize={0.018}
      />
      */}
    </group>
  );
}