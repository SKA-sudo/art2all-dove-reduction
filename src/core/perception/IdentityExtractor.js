export default class IdentityExtractor {
  constructor({ id = "identity-extractor" } = {}) {
    this.id = id;
  }

  extract(perceptionState) {
    return perceptionState;
  }
}