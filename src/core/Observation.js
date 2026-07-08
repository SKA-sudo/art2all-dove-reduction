import PerceptionState from "./perception/PerceptionState";

export default class Observation {
  constructor({
  id,
  referenceModel,
  timestamp = Date.now(),
  faces = [],
  bounds = null,
  primaryAxis = null,
  localWingSpace = null,
}) {
  this.id = id;
  this.referenceModel = referenceModel;
  this.timestamp = timestamp;
  this.faces = faces;
  this.bounds = bounds;
  this.primaryAxis = primaryAxis;
  this.localWingSpace = localWingSpace;
}

  createPerceptionState({ semanticObservations = [] } = {}) {
    return new PerceptionState({
      id: crypto.randomUUID(),
      observation: this,
      semanticObservations,
    });
  }
}