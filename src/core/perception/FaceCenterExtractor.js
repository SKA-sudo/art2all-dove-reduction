import SemanticObservation from "./SemanticObservation";
import FaceCenterAdapter from "./adapters/FaceCenterAdapter";

export default class FaceCenterExtractor {
  constructor({ id = "face-center-extractor" } = {}) {
    this.id = id;
    this.adapter = new FaceCenterAdapter();
  }

  extract(observation) {
    const faces = observation.faces ?? [];

    const value = this.adapter.extract({
      faces,
    });

    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: "WholeDove",
      predicate: "HAS_FACE_CENTERS",
      value,
      source: this.id,
      confidence: value.length > 0 ? 1.0 : 0.0,
    });
  }
}