import PerceptionState from "./perception/PerceptionState";

export default class Observation {
  constructor({
    id,
    referenceModel,
    timestamp = Date.now(),
  }) {
    this.id = id;
    this.referenceModel = referenceModel;
    this.timestamp = timestamp;
  }

  createPerceptionState() {
    return new PerceptionState({
      id: crypto.randomUUID(),
      observation: this,
    });
  }
}