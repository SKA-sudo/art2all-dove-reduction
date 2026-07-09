import WingFingerCurveAdapter from "./adapters/WingFingerCurveAdapter";
import SemanticObservation from "./SemanticObservation";

export default class WingFingerCurvesExtractor {
  constructor({ id = "wing-finger-curves-extractor", side = "left" } = {}) {
    this.id = id;
    this.adapter = new WingFingerCurveAdapter();
  }

  extract(observation) {
    const value = this.adapter.extract({
        localWingSpace: observation.localWingSpace,
        shoulder:
            this.side === "left"
            ? observation.primaryAxis?.leftShoulder
            : observation.primaryAxis?.rightShoulder,
        side: this.side,
        });

    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: this.side === "left" ? "LeftWing" : "RightWing",
      predicate: "HAS_WING_FINGER_CURVES",
      value,
      source: this.id,
      confidence: value.length > 0 ? 1.0 : 0.0,
    });
  }
}