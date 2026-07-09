import SemanticObservation from "./SemanticObservation";

export default class RelationshipForcesExtractor {
  constructor({ id = "relationship-forces-extractor" } = {}) {
    this.id = id;
  }

  extract(observation) {
    const value = {
      shapePull: true,
      overlapAvoidance: true,
      neighborBalance: true,
      boundaryReturn: true,
    };

    return new SemanticObservation({
      id: crypto.randomUUID(),
      subject: "PaperField",
      predicate: "HAS_RELATIONSHIP_FORCES",
      value,
      source: this.id,
      confidence: 1.0,
    });
  }
}