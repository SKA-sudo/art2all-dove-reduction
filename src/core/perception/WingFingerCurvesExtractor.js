import { buildWingFingerCurves } from "../../utils/WingFingerCurveBuilder";
import SemanticObservation from "./SemanticObservation";

export default class WingFingerCurvesExtractor {
  constructor({ id = "wing-finger-curves-extractor", side = "left" } = {}) {
    this.id = id;
    this.side = side;
  }

  extract(observation) {
    const value = buildWingFingerCurves({
      localWingSpace: observation.localWingSpace,
      shoulder: observation.primaryAxis?.leftShoulder,
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