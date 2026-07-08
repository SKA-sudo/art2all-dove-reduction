import { calculateBodyCenter } from "../engine/BodyCenter";
import SemanticObservation from "./SemanticObservation";

export default class BodyCenterExtractor {
  constructor() {
    this.id = "body-center-extractor";
  }

  extract(observation) {
    const faces = observation.faces ?? [];
    const bodyCenter = calculateBodyCenter(faces);

    return new SemanticObservation({
      id: crypto.randomUUID(),
      type: "BodyCenter",
      value: bodyCenter,
      source: this.id,
      confidence: bodyCenter ? 1 : 0,
    });
  }
}