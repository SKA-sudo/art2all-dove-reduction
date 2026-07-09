import OutlineAdapter from "./adapters/OutlineAdapter";
import SemanticObservation from "./SemanticObservation";


export default class OutlineExtractor {
  constructor({ id = "outline-extractor" } = {}) {
    this.id = id;
    this.adapter = new OutlineAdapter();
  }

  extract(observation) {
    const leftWingFaces = observation.localWingSpace?.left ?? [];
    const bounds = observation.bounds ?? null;

    const value = this.adapter.extract({
      leftWingFaces,
      bounds,
    });

    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: "WholeDove",
      predicate: "HAS_OUTLINE",
      value,
      source: this.id,
      confidence: value?.all?.length ? 1.0 : 0.0,
    });
  }
}