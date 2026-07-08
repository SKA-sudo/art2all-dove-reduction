export default class IdentityExtractor {
  constructor({ id = "identity-extractor" } = {}) {
    this.id = id;
  }

  extract(observation) {
    return {
      id: crypto.randomUUID(),
      type: "Identity",
      value: observation,
      source: this.id,
      confidence: 1,
    };
  }
}