import { buildPrimaryGestures } from "../../utils/PrimaryGestureBuilder";
import SemanticObservation from "./SemanticObservation";

export default class GestureExtractor {
  constructor({ id = "gesture-extractor" } = {}) {
    this.id = id;
  }

  extract(observation) {
    const value = buildPrimaryGestures({
      localWingSpace: observation.localWingSpace,
      primaryAxis: observation.primaryAxis,
    });

    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: "WholeDove",
      predicate: "HAS_PRIMARY_GESTURE",
      value,
      source: this.id,
      confidence: value?.length ? 1.0 : 0.0,
    });
  }
}