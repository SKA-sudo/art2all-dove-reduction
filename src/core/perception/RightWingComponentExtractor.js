import SemanticObservation from "./SemanticObservation";

export default class RightWingComponentExtractor {
  constructor({
    id = "right-wing-component-extractor",
  } = {}) {
    this.id = id;
  }

  extract(observation) {
    const rightWingFaces =
      observation?.localWingSpace?.right ?? [];

    const hasRightWingComponent =
      Array.isArray(rightWingFaces) &&
      rightWingFaces.length > 0;

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject: "WholeDove",

      predicate: "HAS_RIGHT_WING_COMPONENT",

      value: hasRightWingComponent
        ? {
            side: "right",
            faces: rightWingFaces,
            faceCount: rightWingFaces.length,
          }
        : null,

      source: this.id,

      confidence:
        hasRightWingComponent ? 1.0 : 0.0,
    });
  }
}