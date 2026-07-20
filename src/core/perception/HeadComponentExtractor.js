import LongitudinalAxisAdapter from "./adapters/LongitudinalAxisAdapter";
import SemanticObservation from "./SemanticObservation";

export default class HeadComponentExtractor {
  constructor({
    id = "head-component-extractor",
  } = {}) {
    this.id = id;
    this.adapter =
      new LongitudinalAxisAdapter();
  }

  extract(observation) {
    const longitudinalAxis =
      this.adapter.extract({
        faces: observation?.faces,
      });

    const headRegion =
      longitudinalAxis?.headRegion ?? null;

    const hasHeadComponent =
      Array.isArray(headRegion?.faces) &&
      headRegion.faces.length > 0;

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "HAS_HEAD_COMPONENT",

      value: hasHeadComponent
        ? {
            region: headRegion,
            reference:
              longitudinalAxis.headReference,
            faceCount:
              headRegion.faces.length,
          }
        : null,

      source: this.id,

      confidence:
        hasHeadComponent ? 1.0 : 0.0,
    });
  }
}