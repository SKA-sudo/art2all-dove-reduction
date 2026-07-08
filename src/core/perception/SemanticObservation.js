export default class SemanticObservation {
  constructor({
    id,
    type,
    value,
    source,
    confidence = 1,
  }) {
    this.id = id;
    this.type = type;
    this.value = value;
    this.source = source;
    this.confidence = confidence;
  }
}