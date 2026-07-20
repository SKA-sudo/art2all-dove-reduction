import SemanticObservation from "./SemanticObservation";

export default class NeckBodyRelationshipExtractor {
  constructor({
    id = "neck-body-relationship-extractor",
  } = {}) {
    this.id = id;
  }

  extract(semanticObservations) {
    const hasNeck = semanticObservations.find(
      (observation) =>
        observation?.predicate ===
        "HAS_NECK_COMPONENT"
    );

    const hasBody = semanticObservations.find(
      (observation) =>
        observation?.predicate ===
        "HAS_BODY_COMPONENT"
    );

    if (!hasNeck || !hasBody) {
      return null;
    }

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "NECK_CONNECTED_TO_BODY",

      value: {
        from: "NECK_COMPONENT",
        to: "BODY_COMPONENT",
        derivedFrom: [
          hasNeck.predicate,
          hasBody.predicate,
        ],
      },

      source: this.id,
      confidence: 1.0,
    });
  }
}