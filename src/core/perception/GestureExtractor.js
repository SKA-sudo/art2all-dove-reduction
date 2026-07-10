import PrimaryGestureAdapter from "./adapters/PrimaryGestureAdapter";
import SemanticObservation from "./SemanticObservation";

export default class GestureExtractor {
  constructor({ id = "gesture-extractor" } = {}) {
    this.id = id;
    this.adapter = new PrimaryGestureAdapter();
  }

  extract(observation) {
    const value = this.adapter.extract({
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