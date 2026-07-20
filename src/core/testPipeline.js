import ReferenceModel from "./ReferenceModel";
import IdentityExtractor from "./perception/IdentityExtractor";
import BodyCenterExtractor from "./perception/BodyCenterExtractor";
import GestureExtractor from "./perception/GestureExtractor";
import LongitudinalAxisExtractor from "./perception/LongitudinalAxisExtractor";

import * as THREE from "three";
import OutlineExtractor from "./perception/OutlineExtractor";
import FaceCenterExtractor from "./perception/FaceCenterExtractor";
import FlowExtractor from "./perception/FlowExtractor";
import RelationshipForcesExtractor from "./perception/RelationshipForcesExtractor";
import WingFingerCurvesExtractor from "./perception/WingFingerCurvesExtractor";
import HeadComponentExtractor from "./perception/HeadComponentExtractor";
import NeckComponentExtractor from "./perception/NeckComponentExtractor";
import SemanticValidator from "./perception/SemanticValidator";
import HeadNeckRelationshipExtractor from "./perception/HeadNeckRelationshipExtractor";
import BodyComponentExtractor from "./perception/BodyComponentExtractor";
import NeckBodyRelationshipExtractor from "./perception/NeckBodyRelationshipExtractor";
import LeftWingComponentExtractor from "./perception/LeftWingComponentExtractor";
import RightWingComponentExtractor from "./perception/RightWingComponentExtractor";
import LeftWingBodyRelationshipExtractor from "./perception/LeftWingBodyRelationshipExtractor";
import RightWingBodyRelationshipExtractor from "./perception/RightWingBodyRelationshipExtractor";
import TailComponentExtractor from "./perception/TailComponentExtractor";
import TailBodyRelationshipExtractor from "./perception/TailBodyRelationshipExtractor";
import BeakComponentExtractor from "./perception/BeakComponentExtractor";
import BeakHeadRelationshipExtractor from "./perception/BeakHeadRelationshipExtractor";
import SemanticGraphBuilder from "./perception/SemanticGraphBuilder";

console.log("PERCEPTION PIPELINE TEST START");


const reference = new ReferenceModel({
  id: "dove-reference",
  type: "glb",
  source: null,
});

const testFaces = [
  // Tail region
  {
    center: new THREE.Vector3(0, 0, -2.0),
    normal: new THREE.Vector3(0, 0, 1),
  },

  {
    center: new THREE.Vector3(0, 0, -1.8),
    normal: new THREE.Vector3(0, 0, 1),
  },

  // Body region
  {
    center: new THREE.Vector3(0, 0, -1.0),
    normal: new THREE.Vector3(0, 0, 1),
  },

  {
    center: new THREE.Vector3(0, 0, 0.0),
    normal: new THREE.Vector3(0, 0, 1),
  },

  {
    center: new THREE.Vector3(0, 0, 1.0),
    normal: new THREE.Vector3(0, 0, 1),
  },

  // Neck region
  {
    center: new THREE.Vector3(0, 0, 1.5),
    normal: new THREE.Vector3(0, 0, 1),
  },

  // Head region
  {
    center: new THREE.Vector3(0, 0, 1.8),
    normal: new THREE.Vector3(0, 0, 1),
  },

  {
    center: new THREE.Vector3(0, 0, 2.0),
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

const componentExtractors = [
  new IdentityExtractor(),
  new FaceCenterExtractor(),
  new BodyCenterExtractor(),
  new LongitudinalAxisExtractor(),
  new HeadComponentExtractor(),
  new BeakComponentExtractor(),
  new GestureExtractor(),
  new NeckComponentExtractor(),
  new BodyComponentExtractor(),
  new TailComponentExtractor(),
  new LeftWingComponentExtractor(),
  new RightWingComponentExtractor(),
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

const relationshipExtractors = [
  new HeadNeckRelationshipExtractor(),
  new NeckBodyRelationshipExtractor(),
  new LeftWingBodyRelationshipExtractor(),
  new RightWingBodyRelationshipExtractor(),
  new TailBodyRelationshipExtractor(),
  new BeakHeadRelationshipExtractor(),
];

const semanticGraphBuilder =
  new SemanticGraphBuilder();

console.log("FaceCenterExtractor:", FaceCenterExtractor);

console.log(
  "Component extractors count:",
  componentExtractors.length
);

console.log(
  "Relationship extractors count:",
  relationshipExtractors.length
);


const semanticObservations =
  componentExtractors.map((extractor) =>
    extractor.extract(observation)
  );
const relationshipObservations =
  relationshipExtractors.map((extractor) =>
    extractor.extract(semanticObservations)
  );

semanticObservations.push(
  ...relationshipObservations
);

semanticObservations.forEach(
  (semanticObservation, index) => {
    console.log(index, {
      predicate:
        semanticObservation?.predicate,

      subject:
        semanticObservation?.subject,

      source:
        semanticObservation?.source,

      value:
        semanticObservation?.value,

      confidence:
        semanticObservation?.confidence,
    });
  }
);


const semanticKnowledgeObservations =
  semanticObservations.filter(
    (semanticObservation) => {
      const predicate =
        semanticObservation?.predicate;

      const isComponent =
        predicate?.startsWith("HAS_") &&
        predicate?.endsWith("_COMPONENT");

      const isRelationship =
        semanticObservation?.value?.from &&
        semanticObservation?.value?.to;

      return isComponent || isRelationship;
    }
  );

const semanticGraph =
  semanticGraphBuilder.build(
    semanticKnowledgeObservations
  );

console.log(
  "===== SEMANTIC KNOWLEDGE GRAPH ====="
);

console.log(
  "NODES",
  semanticGraph.nodes
);

console.log(
  "EDGES",
  semanticGraph.edges
);

console.log(
  "===================================="
);

const semanticValidator = new SemanticValidator();

const validationObservations =
  semanticValidator.validate(semanticObservations);

const allSemanticObservations = [
  ...semanticObservations,
  ...validationObservations,
];

console.log(
  "Semantic predicates:",
  semanticObservations.map(
    (semanticObservation) =>
      semanticObservation.predicate
  )
);


const perceptionState = observation.createPerceptionState({
  semanticObservations: allSemanticObservations,
});

console.log("ReferenceModel:", reference);
console.log("Observation:", observation);

console.log(
  "Component Extractors:",
  componentExtractors
);

console.log(
  "Relationship Extractors:",
  relationshipExtractors
);


console.log("Semantic Observations");

allSemanticObservations.forEach((observation) => {
  console.log(
    `${observation.subject} ${observation.predicate}`,
    observation.value,
    `(confidence: ${observation.confidence ?? "-"})`
  );
});





console.log("PerceptionState:", perceptionState);

console.log("PERCEPTION PIPELINE TEST END");

export {
  semanticGraph,
  perceptionState,
};

export default perceptionState;