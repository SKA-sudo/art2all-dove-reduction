import LongitudinalAxisAdapter from "./adapters/LongitudinalAxisAdapter";
import SemanticObservation from "./SemanticObservation";

export default class NeckComponentExtractor {
  constructor({
    id = "neck-component-extractor",
  } = {}) {
    this.id = id;

    this.adapter =
      new LongitudinalAxisAdapter();
  }

  extract(observation) {
    const longitudinalAxis =
      this.adapter.extract({
        faces: observation.faces,
      });

    const region =
      longitudinalAxis?.neckRegion ?? null;

    const reference =
      longitudinalAxis?.neckReference ?? null;

    const hasNeckComponent =
      Boolean(
        region &&
        Array.isArray(region.faces) &&
        region.faces.length > 0
      );

    const value = hasNeckComponent
      ? {
          region,
          reference,
          faceCount: region.faces.length,
        }
      : null;

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "HAS_NECK_COMPONENT",

      value,

      source: this.id,

      confidence: value ? 1.0 : 0.0,
    });
  }
}