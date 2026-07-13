import SemanticObservation from "./SemanticObservation";
import HeadRegionAdapter from "./adapters/HeadRegionAdapter";

export default class HeadRegionExtractor {
  constructor({
    id = "head-region-extractor",
  } = {}) {
    this.id = id;
    this.adapter = new HeadRegionAdapter();
  }

  extract(observation) {
    const value = this.adapter.extract({
      faces: observation.faces,
    });

    const hasFaces =
      Array.isArray(value?.faces) &&
      value.faces.length > 0;

      return new SemanticObservation({
        id: crypto.randomUUID(),
        subject: "WholeDove",
        predicate: "HAS_HEAD_REGION",

        value: {
          ...value,
          faceCount: value?.faces?.length ?? 0,
        },

        source: this.id,
        confidence: hasFaces ? 1.0 : 0.0,
      });
  }
}