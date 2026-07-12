import { buildLongitudinalAxis } from "../../../utils/LongitudinalAxisBuilder";

export default class LongitudinalAxisAdapter {
  extract({ faces }) {
    return buildLongitudinalAxis({
      faces,
    });
  }
}