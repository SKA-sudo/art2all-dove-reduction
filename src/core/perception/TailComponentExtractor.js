import LongitudinalAxisAdapter from "./adapters/LongitudinalAxisAdapter";
import SemanticObservation from "./SemanticObservation";

export default class TailComponentExtractor {
  constructor({
    id = "tail-component-extractor",
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

    const tailRegion =
      longitudinalAxis?.tailRegion ?? null;

    const hasTailComponent =
      Array.isArray(tailRegion?.faces) &&
      tailRegion.faces.length > 0;

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "HAS_TAIL_COMPONENT",

      value: hasTailComponent
        ? {
            region: tailRegion,
            reference:
              longitudinalAxis.tailReference,
            faceCount:
              tailRegion.faces.length,
          }
        : null,

      source: this.id,

      confidence:
        hasTailComponent ? 1.0 : 0.0,
    });
  }
}