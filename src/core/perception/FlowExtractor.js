import FlowAdapter, {
  extractFlow,
} from "./adapters/FlowAdapter";
import SemanticObservation from "./SemanticObservation";

export { extractFlow };

export default class FlowExtractor {
  constructor({ id = "surface-normal-extractor" } = {}) {
    this.id = id;
    this.adapter = new FlowAdapter();
  }

  extract(observation) {
    const value = this.adapter.extract({
      faces: observation.faces ?? [],
    });

    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: "WholeDove",
      predicate: "HAS_SURFACE_NORMALS",
      value,
      source: this.id,
      confidence: value.length > 0 ? 1.0 : 0.0,
    });
  }
}