import * as THREE from "three";

/**
 * Computes local metrics for every Semantic Surface element.
 *
 * Currently implemented:
 * - averageNeighbourDistance
 * - localDensity
 */
export function computeSemanticSurfaceMetrics(
  semanticSurface,
  {
    neighbourCount = 6,
  } = {}
) {
  if (!semanticSurface) {
    return semanticSurface;
  }

  const elements = semanticSurface.elements.map(
    (element) => {
      const distances = semanticSurface.elements
        .filter((candidate) => candidate !== element)
        .map((candidate) => ({
          distance:
            element.position.distanceTo(
              candidate.position
            ),
        }))
        .sort(
          (a, b) =>
            a.distance - b.distance
        )
        .slice(0, neighbourCount);

      const averageDistance =
        distances.length === 0
          ? 0
          : distances.reduce(
              (sum, value) =>
                sum + value.distance,
              0
            ) / distances.length;

      return {
        ...element,

        metrics: {
          ...element.metrics,

          averageNeighbourDistance:
            averageDistance,

          localDensity:
            averageDistance > 0
              ? 1 / averageDistance
              : 0,
        },
      };
    }
  );

  return {
    ...semanticSurface,
    elements,
  };
}