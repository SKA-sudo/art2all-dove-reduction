import ReferenceModel from "./ReferenceModel";
import IdentityExtractor from "./perception/IdentityExtractor";
import BodyCenterExtractor from "./perception/BodyCenterExtractor";
import GestureExtractor from "./perception/GestureExtractor";
import * as THREE from "three";
import OutlineExtractor from "./perception/OutlineExtractor";
import FaceCenterExtractor from "./perception/FaceCenterExtractor";
import FlowExtractor from "./perception/FlowExtractor";
import RelationshipForcesExtractor from "./perception/RelationshipForcesExtractor";
import WingFingerCurvesExtractor from "./perception/WingFingerCurvesExtractor";

console.log("PERCEPTION PIPELINE TEST START");

const reference = new ReferenceModel({
  id: "dove-reference",
  type: "glb",
  source: null,
});

const testFaces = [
  {
    center: new THREE.Vector3(0, 0, 0),
    normal: new THREE.Vector3(0, 0, 1),
  },
  {
    center: new THREE.Vector3(2, 0, 0),
    normal: new THREE.Vector3(0, 0, 1),
  },
  {
    center: new THREE.Vector3(0, 2, 0),
    normal: new THREE.Vector3(0, 0, 1),
  },
];

const observation = reference.createObservation({
  faces: testFaces,

  bounds: {
    min: new THREE.Vector3(0, 0, 0),
    max: new THREE.Vector3(2, 2, 0),
  },

  primaryAxis: {
    leftShoulder: { center: testFaces[0].center },
    leftWingTip: { center: testFaces[1].center },
    rightShoulder: { center: testFaces[0].center },
    rightWingTip: { center: testFaces[2].center },
  },

  localWingSpace: {
    left: testFaces,
    right: testFaces,
  },
});

const extractors = [
  new IdentityExtractor(),
  new FaceCenterExtractor(),
  new BodyCenterExtractor(),
  new GestureExtractor(),
  new OutlineExtractor(),
  new FlowExtractor(),
  new RelationshipForcesExtractor(),
  new WingFingerCurvesExtractor({
    side: "left",
  }),
  new WingFingerCurvesExtractor({
    side: "right",
  }),
];

console.log("FaceCenterExtractor:", FaceCenterExtractor);
console.log("Extractors count:", extractors.length);
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