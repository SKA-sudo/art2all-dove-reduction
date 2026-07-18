import SemanticObservation from "./SemanticObservation";

import { createSemanticSurface } from "./SemanticSurface";
import { computeSemanticSurfaceMetrics } from "./SemanticSurfaceMetrics";

export default class HeadSurfaceExtractor {
  extract(headRegionObservation) {
    if (!headRegionObservation) {
      return null;
    }

    const region = headRegionObservation.value;

    if (!region) {
      return null;
    }

    const semanticSurface = createSemanticSurface({
      region,
      regionId: "head",
    });

    const surfaceWithMetrics =
      computeSemanticSurfaceMetrics(
        semanticSurface
      );

    return new SemanticObservation({
      subject: "HeadRegion",

      predicate: "HAS_HEAD_SURFACE",

      value: surfaceWithMetrics,

      source: "HeadSurfaceExtractor",

      confidence: 1.0,
    });
  }
}