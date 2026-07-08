import { calculateBodyCenter } from "../engine/BodyCenter";
import SemanticObservation from "./SemanticObservation";

export default class BodyCenterExtractor {
  constructor({ id = "body-center-extractor" } = {}) {
    this.id = id;
  }

  extract(observation) {
    const faces = observation.faces ?? [];
    const bodyCenter = calculateBodyCenter(faces);

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