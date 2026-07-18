import SemanticObservation from "./SemanticObservation";

export default class WingRegionExtractor {
  constructor({
    side,
    id = `${side}-wing-region-extractor`,
  } = {}) {
    if (side !== "left" && side !== "right") {
      throw new Error(
        "WingRegionExtractor requires side 'left' or 'right'."
      );
    }

    this.id = id;
    this.side = side;
  }

  extract(observation) {
    const faces =
      observation?.localWingSpace?.[
        this.side
      ] ?? [];

    const hasFaces =
      Array.isArray(faces) &&
      faces.length > 0;

    return new SemanticObservation({
      id: crypto.randomUUID(),

      subject:
        this.side === "left"
          ? "LeftWing"
          : "RightWing",

      predicate:
        this.side === "left"
          ? "HAS_LEFT_WING_REGION"
          : "HAS_RIGHT_WING_REGION",

      value: {
        side: this.side,
        faces,
        faceCount: faces.length,
      },

      source: this.id,
      confidence: hasFaces ? 1.0 : 0.0,
    });
  }
}