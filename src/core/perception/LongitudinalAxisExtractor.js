import LongitudinalAxisAdapter from "./adapters/LongitudinalAxisAdapter";
import SemanticObservation from "./SemanticObservation";

export default class LongitudinalAxisExtractor {
  constructor({
    id = "longitudinal-axis-extractor",
  } = {}) {
    this.id = id;
    this.adapter =
      new LongitudinalAxisAdapter();
  }

  extract(observation) {
    const value = this.adapter.extract({
      faces: observation.faces,
    });

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "HAS_LONGITUDINAL_AXIS",

      value,

      source: this.id,

      confidence: value ? 1.0 : 0.0,
    });
  }
}