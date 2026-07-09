import { buildLeftWingContour } from "../../../utils/WingContourBuilder";

export default class OutlineAdapter {
  extract({ leftWingFaces, bounds }) {
    if (!leftWingFaces.length || !bounds) {
      return null;
    }

    return buildLeftWingContour(leftWingFaces, bounds);
  }
}