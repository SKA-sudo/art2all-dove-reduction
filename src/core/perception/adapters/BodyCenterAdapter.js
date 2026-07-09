import { calculateBodyCenter } from "../../engine/BodyCenter";

export default class BodyCenterAdapter {
  extract({ faces }) {
    return calculateBodyCenter(faces);
  }
}