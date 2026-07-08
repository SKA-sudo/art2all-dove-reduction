import SemanticObservation from "./SemanticObservation";

export default class FaceCenterExtractor {
  constructor({ id = "face-center-extractor" } = {}) {
    this.id = id;
  }

  extract(observation) {
    const faces = observation.faces ?? [];
    const value = faces
      .map((face, index) => ({
        id: `face-center-${index}`,
        position: face.center,
      }))
      .filter((faceCenter) => faceCenter.position);

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