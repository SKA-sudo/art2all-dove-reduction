import { buildLongitudinalAxis } from "../../../utils/LongitudinalAxisBuilder";

export default class HeadRegionAdapter {
  extract({ faces }) {
    const longitudinalAxis = buildLongitudinalAxis({
      faces,
    });

    return longitudinalAxis?.headRegion ?? null;
  }
}