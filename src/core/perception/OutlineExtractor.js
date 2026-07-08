import { buildLeftWingContour } from "../../utils/WingContourBuilder";
import SemanticObservation from "./SemanticObservation";

export default class OutlineExtractor {
  constructor({ id = "outline-extractor" } = {}) {
    this.id = id;
  }

  extract(observation) {
    const leftWingFaces = observation.localWingSpace?.left ?? [];
    const bounds = observation.bounds ?? null;

    const value =
      leftWingFaces.length > 0 && bounds
        ? buildLeftWingContour(leftWingFaces, bounds)
        : null;

    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: "WholeDove",
      predicate: "HAS_OUTLINE",
      value,
      source: this.id,
      confidence: value?.all?.length ? 1.0 : 0.0,
    });
  }
}