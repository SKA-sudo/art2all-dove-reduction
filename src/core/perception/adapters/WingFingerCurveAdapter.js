import { buildWingFingerCurves } from "../../../utils/WingFingerCurveBuilder";

export default class WingFingerCurveAdapter {
  extract({ localWingSpace, shoulder, side }) {
    return buildWingFingerCurves({
      localWingSpace,
      shoulder,
      side,
    });
  }
}