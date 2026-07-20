import SemanticObservation from "./SemanticObservation";

export default class LeftWingComponentExtractor {
  constructor({
    id = "left-wing-component-extractor",
  } = {}) {
    this.id = id;
  }

  extract(observation) {
    const leftWingFaces =
      observation?.localWingSpace?.left ?? [];

    const hasLeftWingComponent =
      Array.isArray(leftWingFaces) &&
      leftWingFaces.length > 0;

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "HAS_LEFT_WING_COMPONENT",

      value: hasLeftWingComponent
        ? {
            side: "left",
            faces: leftWingFaces,
            faceCount: leftWingFaces.length,
          }
        : null,

      source: this.id,

      confidence:
        hasLeftWingComponent ? 1.0 : 0.0,
    });
  }
}