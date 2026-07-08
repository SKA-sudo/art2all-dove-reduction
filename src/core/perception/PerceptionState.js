export default class PerceptionState {
  constructor({
    observation = null,
    semanticObservations = [],
  } = {}) {
    this.observation = observation;
    this.semanticObservations = semanticObservations;
  }

  addSemanticObservation(semanticObservation) {
    if (!semanticObservation) return this;

    return new PerceptionState({
      observation: this.observation,
      semanticObservations: [
        ...this.semanticObservations,
        semanticObservation,
      ],
    });
  }
}