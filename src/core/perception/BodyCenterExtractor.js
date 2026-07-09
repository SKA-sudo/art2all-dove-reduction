import SemanticObservation from "./SemanticObservation";
import BodyCenterAdapter from "./adapters/BodyCenterAdapter";

export default class BodyCenterExtractor {
  constructor({ id = "body-center-extractor" } = {}) {
    this.id = id;
    this.adapter = new BodyCenterAdapter();
  }

  extract(observation) {
    const faces = observation.faces ?? [];

    const bodyCenter = this.adapter.extract({
      faces,
    });

    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: "WholeDove",
      predicate: "HAS_BODY_CENTER",
      value: bodyCenter,
      source: this.id,
      confidence: bodyCenter ? 1.0 : 0.0,
    });
  }
}