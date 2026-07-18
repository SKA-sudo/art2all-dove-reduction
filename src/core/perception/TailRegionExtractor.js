import SemanticObservation from "./SemanticObservation";

export default class TailRegionExtractor {
  constructor({
    id = "tail-region-extractor",
  } = {}) {
    this.id = id;
  }

  extract(longitudinalAxisObservation) {
    const tailRegion =
      longitudinalAxisObservation?.value
        ?.tailRegion ?? null;

    const hasFaces =
      Array.isArray(tailRegion?.faces) &&
      tailRegion.faces.length > 0;

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",
      predicate: "HAS_TAIL_REGION",

      value: tailRegion,

      source: this.id,
      confidence: hasFaces ? 1.0 : 0.0,
    });
  }
}