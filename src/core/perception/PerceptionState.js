export default class PerceptionState {
  constructor({
    id,
    observation,
    extractors = [],
  }) {
    this.id = id;
    this.observation = observation;
    this.extractors = extractors;
  }

  runExtractor(extractor) {
    return extractor.extract(this);
  }
}