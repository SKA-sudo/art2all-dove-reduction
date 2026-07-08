import PerceptionState from "./perception/PerceptionState";

export default class Observation {
  constructor({
    id,
    referenceModel,
    timestamp = Date.now(),
    faces = [],
  }) {
    this.id = id;
    this.referenceModel = referenceModel;
    this.timestamp = timestamp;
    this.faces = faces;
  }

  createPerceptionState({ semanticObservations = [] } = {}) {
    return new PerceptionState({
      id: crypto.randomUUID(),
      observation: this,
      semanticObservations,
    });
  }
}