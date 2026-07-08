import Observation from "./Observation";

export default class ReferenceModel {
  constructor({
    id,
    type,
    source,
    metadata = {},
  }) {
    this.id = id;
    this.type = type;
    this.source = source;
    this.metadata = metadata;
  }

 createObservation({ faces = [] } = {}) {
  return new Observation({
    id: crypto.randomUUID(),
    referenceModel: this,
    faces,
  });
}
}