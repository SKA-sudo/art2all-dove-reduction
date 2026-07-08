import ReferenceModel from "./ReferenceModel";
import IdentityExtractor from "./perception/IdentityExtractor";

console.log("PERCEPTION PIPELINE TEST START");

const reference = new ReferenceModel({
  id: "dove-reference",
  type: "glb",
  source: null,
});

const observation = reference.createObservation();
const perceptionState = observation.createPerceptionState();

const identityExtractor = new IdentityExtractor();
const extractedState = perceptionState.runExtractor(identityExtractor);

console.log("ReferenceModel:", reference);
console.log("Observation:", observation);
console.log("PerceptionState:", perceptionState);
console.log("IdentityExtractor:", identityExtractor);
console.log("ExtractedState:", extractedState);

console.log("PERCEPTION PIPELINE TEST END");