import { buildPrimaryGestures } from "../../../utils/PrimaryGestureBuilder";

export default class PrimaryGestureAdapter {
  extract({ localWingSpace, primaryAxis }) {
    return buildPrimaryGestures({
      localWingSpace,
      primaryAxis,
    });
  }
  }