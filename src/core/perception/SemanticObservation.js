export default class SemanticObservation {
  constructor({
    id,
    subject,
    predicate,
    value,
    source,
    confidence = 1.0,
  }) {
    this.id = id;
    this.subject = subject;
    this.predicate = predicate;
    this.value = value;
    this.source = source;
    this.confidence = confidence;
  }
}