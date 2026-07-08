import ReferenceModel from "./ReferenceModel";
import ExtractorPipeline from "./perception/ExtractorPipeline";
import IdentityExtractor from "./perception/IdentityExtractor";

console.log("PERCEPTION PIPELINE TEST START");

const reference = new ReferenceModel({
  id: "dove-reference",
  type: "glb",
  source: null,
});

const observation = reference.createObservation();
const perceptionState = observation.createPerceptionState();

const extractorPipeline = new ExtractorPipeline({
  extractors: [new IdentityExtractor()],
});

const extractedState = extractorPipeline.run(perceptionState);

console.log("ReferenceModel:", reference);
console.log("Observation:", observation);
console.log("PerceptionState:", perceptionState);
console.log("ExtractorPipeline:", extractorPipeline);
console.log("ExtractedState:", extractedState);

console.log("PERCEPTION PIPELINE TEST END");