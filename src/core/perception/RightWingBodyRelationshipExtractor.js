import SemanticObservation from "./SemanticObservation";

export default class RightWingBodyRelationshipExtractor {
  constructor({
    id = "right-wing-body-relationship-extractor",
  } = {}) {
    this.id = id;
  }

  extract(semanticObservations) {
    const hasRightWing =
      semanticObservations.find(
        (observation) =>
          observation?.predicate ===
          "HAS_RIGHT_WING_COMPONENT"
      );

    const hasBody =
      semanticObservations.find(
        (observation) =>
          observation?.predicate ===
          "HAS_BODY_COMPONENT"
      );

    if (!hasRightWing || !hasBody) {
      return null;
    }

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate:
        "RIGHT_WING_CONNECTED_TO_BODY",

      value: {
        from: "RIGHT_WING_COMPONENT",
        to: "BODY_COMPONENT",
        derivedFrom: [
          hasRightWing.predicate,
          hasBody.predicate,
        ],
      },

      source: this.id,
      confidence: 1.0,
    });
  }
}