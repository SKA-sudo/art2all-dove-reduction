import { createSemanticSurface } from "./SemanticSurface";

export default class SemanticSurfaceFactory {
  build(semanticGraph) {
    if (!semanticGraph) {
      return [];
    }

    return semanticGraph.nodes
      .filter((node) => node.type === "COMPONENT")
      .filter((node) => Array.isArray(node.value?.faces))
      .map((node) =>
        createSemanticSurface({
          region: {
            faces: node.value.faces,
          },
          regionId: node.id,
        })
      );
  }
}