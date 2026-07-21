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

  const observationsByPredicate = new Map(
    semanticObservations
      .filter(
        (observation) =>
          typeof observation?.predicate === "string"
      )
      .map((observation) => [
        observation.predicate,
        observation,
      ])
  );

  for (const observation of semanticObservations) {
    if (!observation) {
      continue;
    }

    this.addSubjectNode(nodes, observation);

    this.addComponentNode(
      nodes,
      observation,
      observationsByPredicate
    );

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

  addComponentNode(
  nodes,
  observation,
  observationsByPredicate
) {
  const predicate = observation?.predicate;

  if (
    typeof predicate !== "string" ||
    !predicate.startsWith("HAS_") ||
    !predicate.endsWith("_COMPONENT")
  ) {
    return;
  }

  const componentId = predicate.slice(
    "HAS_".length
  );

  if (nodes.has(componentId)) {
    return;
  }

  const regionPredicate = predicate.replace(
    /_COMPONENT$/,
    "_REGION"
  );

  const regionObservation =
    observationsByPredicate.get(regionPredicate);

  const componentValue =
    Array.isArray(regionObservation?.value?.faces)
      ? regionObservation.value
      : observation.value;

  nodes.set(componentId, {
    id: componentId,
    type: "COMPONENT",
    predicate,
    source: observation.source,
    confidence: observation.confidence,
    value: componentValue,

    metadata: {
      regionPredicate:
        regionObservation?.predicate ?? null,

      derivedFrom:
        observation.derivedFrom ?? [],
    },
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