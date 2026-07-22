export default class SemanticSurfaceBuilder {
  constructor({
    id = "semantic-surface-builder",
  } = {}) {
    this.id = id;
  }

  build(semanticGraph) {
    const nodes = Array.isArray(semanticGraph?.nodes)
      ? semanticGraph.nodes
      : [];

    const edges = Array.isArray(semanticGraph?.edges)
      ? semanticGraph.edges
      : [];

    const componentNodes = nodes.filter(
      (node) => node?.type === "COMPONENT"
    );

    const components = componentNodes.map((node) =>
      this.buildSurfaceComponent(node, edges)
    );

    return {
      id: this.id,

      subject:
        nodes.find(
          (node) => node?.type === "SUBJECT"
        )?.id ?? null,

      components,

      metadata: {
        componentCount: components.length,

        sourceNodeCount: nodes.length,

        sourceEdgeCount: edges.length,

        source: "SEMANTIC_GRAPH",
      },
    };
  }

  buildSurfaceComponent(node, edges) {
    const value =
      node?.value &&
      typeof node.value === "object"
        ? node.value
        : {};

    const faces = Array.isArray(value.faces)
      ? value.faces
      : [];

    const relationships =
      this.findComponentRelationships(
        node.id,
        edges
      );

    return {
      id: node.id,

      type: "SEMANTIC_SURFACE_COMPONENT",

      predicate: node.predicate ?? null,

      source: node.source ?? null,

      confidence:
        typeof node.confidence === "number"
          ? node.confidence
          : null,

      faces,

      center:
        value.center ??
        value.centroid ??
        null,

      bounds:
        value.bounds ??
        value.boundingBox ??
        null,

      relationships,

      neighbours:
        this.extractNeighbours(
          node.id,
          relationships
        ),

      metadata: {
        regionPredicate:
          node.metadata?.regionPredicate ??
          null,

        derivedFrom:
          Array.isArray(
            node.metadata?.derivedFrom
          )
            ? node.metadata.derivedFrom
            : [],

        faceCount: faces.length,

        sourceNodeId: node.id,
      },
    };
  }

  findComponentRelationships(
    componentId,
    edges
  ) {
    return edges
      .filter(
        (edge) =>
          edge?.from === componentId ||
          edge?.to === componentId
      )
      .map((edge) => ({
        id:
          edge.id ??
          `${edge.predicate}:${edge.from}:${edge.to}`,

        predicate: edge.predicate ?? null,

        from: edge.from ?? null,

        to: edge.to ?? null,

        source: edge.source ?? null,

        confidence:
          typeof edge.confidence === "number"
            ? edge.confidence
            : null,

        derivedFrom:
          Array.isArray(edge.derivedFrom)
            ? edge.derivedFrom
            : [],
      }));
  }

  extractNeighbours(
    componentId,
    relationships
  ) {
    const neighbours = new Set();

    for (const relationship of relationships) {
      if (
        relationship.from === componentId &&
        relationship.to
      ) {
        neighbours.add(relationship.to);
      }

      if (
        relationship.to === componentId &&
        relationship.from
      ) {
        neighbours.add(relationship.from);
      }
    }

    return Array.from(neighbours);
  }
}