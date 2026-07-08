export default class PerceptionState {
  constructor({
    id,
    observation,
    semanticObservations = [],
  }) {
    this.id = id;
    this.observation = observation;
    this.semanticObservations = semanticObservations;
  }
}