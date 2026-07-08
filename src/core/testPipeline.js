import ReferenceModel from "./ReferenceModel";
import IdentityExtractor from "./perception/IdentityExtractor";
import BodyCenterExtractor from "./perception/BodyCenterExtractor";

console.log("PERCEPTION PIPELINE TEST START");

const reference = new ReferenceModel({
  id: "dove-reference",
  type: "glb",
  source: null,
});

const testFaces = [
  { center: { x: 0, y: 0, z: 0 } },
  { center: { x: 2, y: 0, z: 0 } },
  { center: { x: 0, y: 2, z: 0 } },
];

const observation = reference.createObservation({
  faces: testFaces,
});

const extractors = [
  new IdentityExtractor(),
  new BodyCenterExtractor(),
];

const semanticObservations = extractors.map((extractor) =>
  extractor.extract(observation)
);

const perceptionState = observation.createPerceptionState({
  semanticObservations,
});

console.log("ReferenceModel:", reference);
console.log("Observation:", observation);
console.log("Extractors:", extractors);
console.log("Semantic Observations");

semanticObservations.forEach((observation) => {
  console.log(
    `${observation.subject} ${observation.predicate}`,
    observation.value,
    `(confidence: ${observation.confidence})`
  );
});
console.log("PerceptionState:", perceptionState);

console.log("PERCEPTION PIPELINE TEST END");

export default perceptionState;