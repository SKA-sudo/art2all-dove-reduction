import SemanticObservation from "./SemanticObservation";

export default class TailBodyRelationshipExtractor {
  constructor({
    id = "tail-body-relationship-extractor",
  } = {}) {
    this.id = id;
  }

  extract(semanticObservations) {
    const hasTail = semanticObservations.find(
      (observation) =>
        observation?.predicate ===
        "HAS_TAIL_COMPONENT"
    );

    const hasBody = semanticObservations.find(
      (observation) =>
        observation?.predicate ===
        "HAS_BODY_COMPONENT"
    );

    if (!hasTail || !hasBody) {
      return null;
    }

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "TAIL_CONNECTED_TO_BODY",

      value: {
        from: "TAIL_COMPONENT",
        to: "BODY_COMPONENT",
        derivedFrom: [
          hasTail.predicate,
          hasBody.predicate,
        ],
      },

      source: this.id,
      confidence: 1.0,
    });
  }
}