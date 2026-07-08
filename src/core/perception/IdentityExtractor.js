import SemanticObservation from "./SemanticObservation";

export default class IdentityExtractor {
  constructor({ id = "identity-extractor" } = {}) {
    this.id = id;
  }

  extract(observation) {
    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: "ReferenceModel",
      predicate: "HAS_OBSERVATION",
      value: observation,
      source: this.id,
      confidence: 1.0,
    });
  }
}