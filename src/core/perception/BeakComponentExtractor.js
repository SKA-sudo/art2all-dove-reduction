import LongitudinalAxisAdapter from "./adapters/LongitudinalAxisAdapter";
import SemanticObservation from "./SemanticObservation";

export default class BeakComponentExtractor {
  constructor({
    id = "beak-component-extractor",
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

    if (
      !Array.isArray(headRegion?.faces) ||
      headRegion.faces.length === 0
    ) {
      return new SemanticObservation({
        id: crypto.randomUUID(),
        subject: "WholeDove",
        predicate: "HAS_BEAK_COMPONENT",
        value: null,
        source: this.id,
        confidence: 0.0,
      });
    }

    // Vorderste Face der Head-Region
    const beakFace = headRegion.faces.reduce(
      (front, current) =>
        current.center.z > front.center.z
          ? current
          : front
    );

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "HAS_BEAK_COMPONENT",

      value: {
        face: beakFace,
        reference: beakFace.center,
      },

      source: this.id,

      confidence: 1.0,
    });
  }
}