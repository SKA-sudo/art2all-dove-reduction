export default class ExtractorPipeline {
  constructor(extractors = []) {
    this.extractors = extractors;
  }

  run(observation) {
    const semanticObservations = [];

    this.extractors.forEach((extractor) => {
      const result = extractor.extract(observation);

      if (!result) return;

      if (Array.isArray(result)) {
        semanticObservations.push(...result);
        return;
      }

      semanticObservations.push(result);
    });

    return semanticObservations;
  }
}