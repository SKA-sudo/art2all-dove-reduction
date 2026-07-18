import SemanticObservation from "./SemanticObservation";

export default class BodyRegionExtractor {
  constructor({
    id = "body-region-extractor",
  } = {}) {
    this.id = id;
  }

  extract(longitudinalAxisObservation) {
    const bodyRegion =
      longitudinalAxisObservation?.value
        ?.bodyRegion ?? null;

    const hasFaces =
      Array.isArray(bodyRegion?.faces) &&
      bodyRegion.faces.length > 0;

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",
      predicate: "HAS_BODY_REGION",

      value: bodyRegion,

      source: this.id,
      confidence: hasFaces ? 1.0 : 0.0,
    });
  }
}