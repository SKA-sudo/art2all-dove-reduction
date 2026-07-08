export default class ExtractorPipeline {
  constructor({ extractors = [] } = {}) {
    this.extractors = extractors;
  }

  run(perceptionState) {
    return this.extractors.reduce(
      (currentState, extractor) => extractor.extract(currentState),
      perceptionState
    );
  }
}