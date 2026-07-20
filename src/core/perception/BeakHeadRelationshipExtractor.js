import SemanticObservation from "./SemanticObservation";

export default class BeakHeadRelationshipExtractor {
  constructor({
    id = "beak-head-relationship-extractor",
  } = {}) {
    this.id = id;
  }

  extract(semanticObservations) {
    const hasBeak = semanticObservations.find(
      (observation) =>
        observation?.predicate ===
        "HAS_BEAK_COMPONENT"
    );

    const hasHead = semanticObservations.find(
      (observation) =>
        observation?.predicate ===
        "HAS_HEAD_COMPONENT"
    );

    if (!hasBeak || !hasHead) {
      return null;
    }

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "BEAK_BELONGS_TO_HEAD",

      value: {
        from: "BEAK_COMPONENT",
        to: "HEAD_COMPONENT",
        derivedFrom: [
          hasBeak.predicate,
          hasHead.predicate,
        ],
      },

      source: this.id,
      confidence: 1.0,
    });
  }
}