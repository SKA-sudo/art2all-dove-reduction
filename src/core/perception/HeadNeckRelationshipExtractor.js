import SemanticObservation from "./SemanticObservation";

export default class HeadNeckRelationshipExtractor {
  constructor({
    id = "head-neck-relationship-extractor",
  } = {}) {
    this.id = id;
  }

  extract(observations = []) {
    const headComponent = observations.find(
      (observation) =>
        observation?.predicate ===
          "HAS_HEAD_COMPONENT" &&
        Boolean(observation.value)
    );

    const neckComponent = observations.find(
      (observation) =>
        observation?.predicate ===
          "HAS_NECK_COMPONENT" &&
        Boolean(observation.value)
    );

    const isConnected =
      Boolean(headComponent) &&
      Boolean(neckComponent);

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "HEAD_CONNECTED_TO_NECK",

      value: isConnected
        ? {
            from: "HEAD_COMPONENT",
            to: "NECK_COMPONENT",
            derivedFrom: [
              "HAS_HEAD_COMPONENT",
              "HAS_NECK_COMPONENT",
            ],
          }
        : null,

      source: this.id,

      confidence: isConnected ? 1.0 : 0.0,
    });
  }
}