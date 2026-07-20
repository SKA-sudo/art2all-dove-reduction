import LongitudinalAxisAdapter from "./adapters/LongitudinalAxisAdapter";
import SemanticObservation from "./SemanticObservation";

export default class BodyComponentExtractor {
  constructor({
    id = "body-component-extractor",
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

    const bodyRegion =
      longitudinalAxis?.bodyRegion ?? null;

    const hasBodyComponent =
      Array.isArray(bodyRegion?.faces) &&
      bodyRegion.faces.length > 0;

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "HAS_BODY_COMPONENT",

      value: hasBodyComponent
        ? {
            region: bodyRegion,
            reference:
              longitudinalAxis.bodyReference,
            faceCount:
              bodyRegion.faces.length,
          }
        : null,

      source: this.id,

      confidence:
        hasBodyComponent ? 1.0 : 0.0,
    });
  }
}