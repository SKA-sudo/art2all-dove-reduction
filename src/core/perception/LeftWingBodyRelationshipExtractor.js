import SemanticObservation from "./SemanticObservation";

export default class LeftWingBodyRelationshipExtractor {
  constructor({
    id = "left-wing-body-relationship-extractor",
  } = {}) {
    this.id = id;
  }

  extract(semanticObservations) {
    const hasLeftWing =
      semanticObservations.find(
        (observation) =>
          observation?.predicate ===
          "HAS_LEFT_WING_COMPONENT"
      );

    const hasBody =
      semanticObservations.find(
        (observation) =>
          observation?.predicate ===
          "HAS_BODY_COMPONENT"
      );

    if (!hasLeftWing || !hasBody) {
      return null;
    }

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate:
        "LEFT_WING_CONNECTED_TO_BODY",

      value: {
        from: "LEFT_WING_COMPONENT",
        to: "BODY_COMPONENT",
        derivedFrom: [
          hasLeftWing.predicate,
          hasBody.predicate,
        ],
      },

      source: this.id,
      confidence: 1.0,
    });
  }
}