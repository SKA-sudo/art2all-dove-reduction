import SemanticObservation from "./SemanticObservation";

export default class NeckRegionExtractor {
  constructor({
    id = "neck-region-extractor",
  } = {}) {
    this.id = id;
  }

  extract(longitudinalAxisObservation) {
    const neckRegion =
      longitudinalAxisObservation?.value
        ?.neckRegion ?? null;

    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: "WholeDove",
      predicate: "HAS_NECK_REGION",
      value: neckRegion,
      source: this.id,
      confidence:
        neckRegion?.faces?.length > 0
          ? 1.0
          : 0.0,
    });
  }
}