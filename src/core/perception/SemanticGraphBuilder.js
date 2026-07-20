export default class SemanticGraphBuilder {
  constructor({
    id = "semantic-graph-builder",
  } = {}) {
    this.id = id;
  }

  build(semanticObservations) {
    if (!Array.isArray(semanticObservations)) {
      return {
        nodes: [],
        edges: [],
      };
    }

    const nodes = new Map();
    const edges = [];

    for (const observation of semanticObservations) {
      if (!observation) {
        continue;
      }

      this.addSubjectNode(nodes, observation);
      this.addComponentNode(nodes, observation);
      this.addRelationshipEdge(edges, observation);
    }

    return {
      nodes: Array.from(nodes.values()),
      edges,
    };
  }

  addSubjectNode(nodes, observation) {
    const subject = observation?.subject;

    if (!subject || nodes.has(subject)) {
      return;
    }

    nodes.set(subject, {
      id: subject,
      type: "SUBJECT",
    });
  }

  addComponentNode(nodes, observation) {
    const predicate = observation?.predicate;

    if (
      typeof predicate !== "string" ||
      !predicate.startsWith("HAS_") ||
      !predicate.endsWith("_COMPONENT") ||
      observation?.value == null
    ) {
      return;
    }

    const componentId = predicate.slice(
      "HAS_".length
    );

    if (nodes.has(componentId)) {
      return;
    }

    nodes.set(componentId, {
      id: componentId,
      type: "COMPONENT",
      predicate,
      source: observation.source,
      confidence: observation.confidence,
      value: observation.value,
    });
  }

  addRelationshipEdge(edges, observation) {
    const from = observation?.value?.from;
    const to = observation?.value?.to;

    if (!from || !to) {
      return;
    }

    edges.push({
      id:
        observation.id ??
        `${observation.predicate}:${from}:${to}`,

      from,
      to,

      predicate: observation.predicate,
      source: observation.source,
      confidence: observation.confidence,

      derivedFrom:
        observation.value.derivedFrom ?? [],
    });
  }
}