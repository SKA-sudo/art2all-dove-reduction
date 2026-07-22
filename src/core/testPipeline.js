import * as THREE from "three";

import ReferenceModel from "./ReferenceModel";

import IdentityExtractor from "./perception/IdentityExtractor";
import BodyCenterExtractor from "./perception/BodyCenterExtractor";
import GestureExtractor from "./perception/GestureExtractor";
import LongitudinalAxisExtractor from "./perception/LongitudinalAxisExtractor";
import OutlineExtractor from "./perception/OutlineExtractor";
import FaceCenterExtractor from "./perception/FaceCenterExtractor";
import FlowExtractor from "./perception/FlowExtractor";
import RelationshipForcesExtractor from "./perception/RelationshipForcesExtractor";
import WingFingerCurvesExtractor from "./perception/WingFingerCurvesExtractor";

import HeadComponentExtractor from "./perception/HeadComponentExtractor";
import NeckComponentExtractor from "./perception/NeckComponentExtractor";
import BodyComponentExtractor from "./perception/BodyComponentExtractor";
import LeftWingComponentExtractor from "./perception/LeftWingComponentExtractor";
import RightWingComponentExtractor from "./perception/RightWingComponentExtractor";
import TailComponentExtractor from "./perception/TailComponentExtractor";
import BeakComponentExtractor from "./perception/BeakComponentExtractor";

import HeadNeckRelationshipExtractor from "./perception/HeadNeckRelationshipExtractor";
import NeckBodyRelationshipExtractor from "./perception/NeckBodyRelationshipExtractor";
import LeftWingBodyRelationshipExtractor from "./perception/LeftWingBodyRelationshipExtractor";
import RightWingBodyRelationshipExtractor from "./perception/RightWingBodyRelationshipExtractor";
import TailBodyRelationshipExtractor from "./perception/TailBodyRelationshipExtractor";
import BeakHeadRelationshipExtractor from "./perception/BeakHeadRelationshipExtractor";

import SemanticValidator from "./perception/SemanticValidator";
import SemanticGraphBuilder from "./perception/SemanticGraphBuilder";
import SemanticGraphValidator from "./perception/SemanticGraphValidator";
import SemanticSurfaceBuilder from "./perception/SemanticSurfaceBuilder";
import SemanticSurfaceValidator from "./perception/SemanticSurfaceValidator";

console.log("PERCEPTION PIPELINE TEST START");

/* ============================================================
   REFERENCE MODEL
   ============================================================ */

const reference = new ReferenceModel({
  id: "dove-reference",
  type: "glb",
  source: null,
});

/* ============================================================
   TEST GEOMETRY
   ============================================================ */

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

/* ============================================================
   OBSERVATION
   ============================================================ */

const observation = reference.createObservation({
  faces: testFaces,

  bounds: {
    min: new THREE.Vector3(0, 0, 0),
    max: new THREE.Vector3(2, 2, 0),
  },

  primaryAxis: {
    leftShoulder: {
      center: testFaces[0].center,
    },

    leftWingTip: {
      center: testFaces[1].center,
    },

    rightShoulder: {
      center: testFaces[0].center,
    },

    rightWingTip: {
      center: testFaces[2].center,
    },
  },

  localWingSpace: {
    left: testFaces,
    right: testFaces,
  },
});

/* ============================================================
   COMPONENT EXTRACTORS
   ============================================================ */

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

/* ============================================================
   RELATIONSHIP EXTRACTORS
   ============================================================ */

const relationshipExtractors = [
  new HeadNeckRelationshipExtractor(),
  new NeckBodyRelationshipExtractor(),
  new LeftWingBodyRelationshipExtractor(),
  new RightWingBodyRelationshipExtractor(),
  new TailBodyRelationshipExtractor(),
  new BeakHeadRelationshipExtractor(),
];

/* ============================================================
   BUILDERS AND VALIDATORS
   ============================================================ */

const semanticGraphBuilder =
  new SemanticGraphBuilder();

const semanticGraphValidator =
  new SemanticGraphValidator();

const semanticSurfaceBuilder =
  new SemanticSurfaceBuilder();

const semanticSurfaceValidator =
  new SemanticSurfaceValidator();

const semanticValidator =
  new SemanticValidator();

/* ============================================================
   PIPELINE INFORMATION
   ============================================================ */

console.log(
  "FaceCenterExtractor:",
  FaceCenterExtractor
);

console.log(
  "Component extractors count:",
  componentExtractors.length
);

console.log(
  "Relationship extractors count:",
  relationshipExtractors.length
);

/* ============================================================
   SEMANTIC OBSERVATIONS
   ============================================================ */

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

/* ============================================================
   SEMANTIC KNOWLEDGE OBSERVATIONS
   ============================================================ */

const semanticKnowledgeObservations =
  semanticObservations.filter(
    (semanticObservation) => {
      const predicate =
        semanticObservation?.predicate;

      const isComponent =
        predicate?.startsWith("HAS_") &&
        predicate?.endsWith("_COMPONENT");

      const isRelationship =
        Boolean(
          semanticObservation?.value?.from &&
          semanticObservation?.value?.to
        );

      return (
        isComponent ||
        isRelationship
      );
    }
  );

/* ============================================================
   SEMANTIC GRAPH
   ============================================================ */

const semanticGraph =
  semanticGraphBuilder.build(
    semanticKnowledgeObservations
  );

console.table(
  semanticGraph.nodes.map((node) => ({
    id: node.id,
    type: node.type,
    predicate: node.predicate,
  }))
);

console.table(
  semanticGraph.nodes.map((node) => ({
    id: node.id,
    type: node.type,
    value: node.value,
  }))
);

/* ============================================================
   SEMANTIC GRAPH VALIDATION
   ============================================================ */

const expectedNodeIds = [
  "WholeDove",
  "HEAD_COMPONENT",
  "BEAK_COMPONENT",
  "NECK_COMPONENT",
  "BODY_COMPONENT",
  "TAIL_COMPONENT",
  "LEFT_WING_COMPONENT",
  "RIGHT_WING_COMPONENT",
];

const expectedEdgePredicates = [
  "HEAD_CONNECTED_TO_NECK",
  "NECK_CONNECTED_TO_BODY",
  "LEFT_WING_CONNECTED_TO_BODY",
  "RIGHT_WING_CONNECTED_TO_BODY",
  "TAIL_CONNECTED_TO_BODY",
  "BEAK_BELONGS_TO_HEAD",
];

const semanticGraphValidation =
  semanticGraphValidator.validate(
    semanticGraph,
    {
      expectedNodeIds,
      expectedEdgePredicates,
    }
  );

console.log(
  "===== SEMANTIC GRAPH VALIDATION ====="
);

console.log(
  "VALID",
  semanticGraphValidation.valid
);

console.log(
  "SUMMARY",
  semanticGraphValidation.summary
);

console.log(
  "ERRORS",
  semanticGraphValidation.errors
);

console.log(
  "WARNINGS",
  semanticGraphValidation.warnings
);

console.log(
  "====================================="
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

/* ============================================================
   SEMANTIC SURFACE
   ============================================================ */

const semanticSurface =
  semanticSurfaceBuilder.build(
    semanticGraph
  );

console.log(
  "===== SEMANTIC SURFACE ====="
);

console.log(
  semanticSurface
);

console.table(
  semanticSurface.components.map(
    (component) => ({
      id: component.id,

      type: component.type,

      faceCount:
        component.faces.length,

      neighbourCount:
        component.neighbours.length,

      relationshipCount:
        component.relationships.length,

      center:
        component.center,

      bounds:
        component.bounds,
    })
  )
);

console.log(
  "============================"
);

/* ============================================================
   SEMANTIC SURFACE VALIDATION V1
   ============================================================ */

const semanticSurfaceValidation =
  semanticSurfaceValidator.validateStructure(
    semanticGraph,
    semanticSurface
  );

console.log(
  "===== SEMANTIC SURFACE VALIDATION V1 ====="
);

console.log(
  "VALID",
  semanticSurfaceValidation.valid
);

console.log(
  "SUMMARY",
  semanticSurfaceValidation.summary
);

console.log(
  "COMPONENTS",
  semanticSurfaceValidation.components
);

const failedSurfaceChecks =
  semanticSurfaceValidation.components.map(
    (component) => ({
      id: component.id,

      failedChecks: Object.entries(
        component.checks
      )
        .filter(([, passed]) => !passed)
        .map(([checkName]) => checkName),

      graphFaceCount:
        component.counts.graphFaceCount,

      surfaceFaceCount:
        component.counts.surfaceFaceCount,
    })
  );

console.log(
  "===== FAILED SEMANTIC SURFACE CHECKS ====="
);

console.table(failedSurfaceChecks);

console.log(
  "=========================================="
);

/* ============================================================
   GENERAL SEMANTIC VALIDATION
   ============================================================ */

const validationObservations =
  semanticValidator.validate(
    semanticObservations
  );

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

/* ============================================================
   PERCEPTION STATE
   ============================================================ */

const perceptionState =
  observation.createPerceptionState({
    semanticObservations:
      allSemanticObservations,
  });

console.log(
  "ReferenceModel:",
  reference
);

console.log(
  "Observation:",
  observation
);

console.log(
  "Component Extractors:",
  componentExtractors
);

console.log(
  "Relationship Extractors:",
  relationshipExtractors
);

console.log(
  "Semantic Observations"
);

allSemanticObservations.forEach(
  (semanticObservation) => {
    console.log(
      `${semanticObservation.subject} ${semanticObservation.predicate}`,

      semanticObservation.value,

      `(confidence: ${
        semanticObservation.confidence ??
        "-"
      })`
    );
  }
);

console.log(
  "PerceptionState:",
  perceptionState
);

console.log(
  "PERCEPTION PIPELINE TEST END"
);

/* ============================================================
   EXPORTS
   ============================================================ */

export {
  semanticGraph,
  semanticGraphValidation,
  semanticSurface,
  semanticSurfaceValidation,
  perceptionState,
};

export default perceptionState;