import {useEffect, useMemo, useRef, useState,} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import FlowLayer from "./layers/FlowLayer";
import OutlineLayer from "./layers/OutlineLayer";
import BodyWingTransitionLayer from "./layers/BodyWingTransitionLayer";
import DebugVisualEmergence from "./DebugVisualEmergence";
import VisualPriorityLayer from "./VisualPriorityLayer";
import HeadTailAxisDebug from "./HeadTailAxisDebug";

import { extractFlow } from "../../core/perception/FlowExtractor";
import { extractFaceCenters } from "../../core/perception/RegionExtractor";

import ReferenceModel from "../../core/ReferenceModel";
import LongitudinalAxisExtractor from "../../core/perception/LongitudinalAxisExtractor";
import HeadRegionExtractor from "../../core/perception/HeadRegionExtractor";
import HeadRegionDebug from "./HeadRegionDebug";
import BodyHeadPaperSkin from "./BodyHeadPaperSkin";
import BodySurfaceOrientationDebug from "./BodySurfaceOrientationDebug";
import SemanticWingPaperPrototype from "./SemanticWingPaperPrototype";
import SemanticHeadPaperPrototype from "./SemanticHeadPaperPrototype";
import SemanticNeckPaperPrototype from "./SemanticNeckPaperPrototype";
import SemanticTailPaperPrototype
  from "./SemanticTailPaperPrototype";
import {
  findPrimaryDoveAxis,
  createLocalWingSpace,
} from "../../utils/DoveSpaceBuilder";
import HeadSurfaceExtractor from "../../core/perception/HeadSurfaceExtractor";
import NeckRegionExtractor from "../../core/perception/NeckRegionExtractor";  
import WingRegionExtractor from "../../core/perception/WingRegionExtractor";
import BodyRegionExtractor from "../../core/perception/BodyRegionExtractor";
import TailRegionExtractor from "../../core/perception/TailRegionExtractor";
import { DirectionFieldExtractor } from "../../core/perception/extractors/DirectionFieldExtractor";
import BeakExtractor from "../../core/perception/extractors/BeakExtractor";
import BeakDebug from "./BeakDebug";
import VisualFieldAnalyzerDebug from "./VisualFieldAnalyzerDebug";
import PerceptionRuleEngine
  from "../../core/perception/PerceptionRuleEngine";
import InferenceEngine
  from "../../core/perception/InferenceEngine";
import HeadComponentInference
  from "../../core/perception/HeadComponentInference";  
import BeakComponentInference
  from "../../core/perception/BeakComponentInference";  
import BeakBelongsToHeadInference
  from "../../core/perception/BeakBelongsToHeadInference";  
import BodyComponentInference
  from "../../core/perception/BodyComponentInference";  
import HeadConnectedToBodyInference
  from "../../core/perception/HeadConnectedToBodyInference";
import LeftWingComponentInference
  from "../../core/perception/LeftWingComponentInference";
import RightWingComponentInference
  from "../../core/perception/RightWingComponentInference";  
import LeftWingConnectedToBodyInference
  from "../../core/perception/LeftWingConnectedToBodyInference";
import RightWingConnectedToBodyInference
  from "../../core/perception/RightWingConnectedToBodyInference";  
import TailComponentInference
  from "../../core/perception/TailComponentInference";
import TailConnectedToBodyInference
  from "../../core/perception/TailConnectedToBodyInference";
import NeckComponentInference
  from "../../core/perception/NeckComponentInference";
import HeadConnectedToNeckInference
  from "../../core/perception/HeadConnectedToNeckInference";
import NeckConnectedToBodyInference
  from "../../core/perception/NeckConnectedToBodyInference";
import SemanticValidator
  from "../../core/perception/SemanticValidator";
import SemanticGraphBuilder
  from "../../core/perception/SemanticGraphBuilder";

import SemanticSurfaceFactory
  from "../../core/perception/SemanticSurfaceFactory";    


function createRegionPerceptionState(scene) {
  if (!scene) {
    return {
      meshes: [],
    };
  }

  const meshes = [];

  scene.traverse((child) => {
    if (!child.isMesh) return;

    meshes.push({
      object: child,
    });
  });

  return {
    meshes,
  };
}

    export default function PerceptionModel({
      scene,
      layers,
      emergenceCount,
      distributionMode,
      organizationFlow,
      organizationOverlap,
      organizationAdaptiveSize,
      eyeExperiment,
      onPerceptionStateChange,
    }) {

  const bodyCenterMeshRef = useRef();
  const bodyCenterBoxRef = useRef(new THREE.Box3());
  const bodyCenterVectorRef = useRef(new THREE.Vector3());

  const [
    animatedBodyWingTransitionRegions,
    setAnimatedBodyWingTransitionRegions,
  ] = useState([]);

  const perceptionScene = useMemo(() => {
    if (!scene) return null;

    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;

      child.material = new THREE.MeshBasicMaterial({
        color: "#ff0000",
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        depthTest: false,
        depthWrite: false,
      });
    });

    return clone;
  }, [scene]);

  const flow = useMemo(() => {
    return extractFlow(scene, {
      sampleStep: 100,
      normalLength: 0.08,
    });
  }, [scene]);

  const bodyWingTransitionRegions = useMemo(() => {
    if (!scene) return [];

  const perceptionState =
      createRegionPerceptionState(scene);

    return extractFaceCenters(perceptionState, {
      reduction: 1,
    });
  }, [scene]);

  const runtimePerceptionState = useMemo(() => {
  if (
    !scene ||
    bodyWingTransitionRegions.length === 0
  ) {
    return null;
  }

const canonicalFaces =
    bodyWingTransitionRegions
      .filter((faceCenter) =>
        Boolean(faceCenter?.position)
      )
     .map((faceCenter) => ({
      id: faceCenter.id,
      center: faceCenter.position.clone(),
      normal:
        faceCenter.normal instanceof THREE.Vector3
          ? faceCenter.normal.clone()
          : null,
    }));

  if (canonicalFaces.length === 0) {
    return null;
  }

const referenceModel = new ReferenceModel({
    id: "runtime-dove-reference",
    type: "glb",
    source: scene,
  });

const primaryAxis =
    findPrimaryDoveAxis(canonicalFaces);

const localWingSpace =
    createLocalWingSpace(
      canonicalFaces,
      primaryAxis
    );

const observation =
    referenceModel.createObservation({
      faces: canonicalFaces,
      primaryAxis,
      localWingSpace,
    });

const longitudinalAxisExtractor =
    new LongitudinalAxisExtractor();

const headRegionExtractor =
  new HeadRegionExtractor();

const headSurfaceExtractor =
  new HeadSurfaceExtractor();

const beakExtractor =
  new BeakExtractor();  


const neckRegionExtractor =
  new NeckRegionExtractor();  

const leftWingRegionExtractor =
  new WingRegionExtractor({
    side: "left",
  });

const rightWingRegionExtractor =
  new WingRegionExtractor({
    side: "right",
  });

const bodyRegionExtractor =
  new BodyRegionExtractor();

const tailRegionExtractor =
  new TailRegionExtractor();

const directionFieldExtractor = 
  new DirectionFieldExtractor();  

const longitudinalAxisObservation =
  longitudinalAxisExtractor.extract(
    observation
  );

const directionFieldObservation =
  directionFieldExtractor.extract({
    faces: canonicalFaces,
    longitudinalAxisObservation,
  }); 

const headRegionObservation =
  headRegionExtractor.extract(
    observation
  );

const headSurfaceObservation =
  headSurfaceExtractor.extract(
    headRegionObservation
  );

const beakObservation =
  beakExtractor.extract({
    headRegionObservation,
    longitudinalAxisObservation,
  });  

const neckRegionObservation =
  neckRegionExtractor.extract(
    longitudinalAxisObservation
  );

const leftWingRegionObservation =
  leftWingRegionExtractor.extract(
    observation
  );

const rightWingRegionObservation =
  rightWingRegionExtractor.extract(
    observation
  );
  
const bodyRegionObservation =
  bodyRegionExtractor.extract(
    longitudinalAxisObservation
  );

const tailRegionObservation =
  tailRegionExtractor.extract(
    longitudinalAxisObservation
  );  

const semanticObservations = [
  longitudinalAxisObservation,
  directionFieldObservation,
  headRegionObservation,
  headSurfaceObservation,
  beakObservation,
  neckRegionObservation,
  bodyRegionObservation,
  tailRegionObservation,
  leftWingRegionObservation,
  rightWingRegionObservation,
].filter(Boolean);

const inferenceEngine =
  new InferenceEngine({
    rules: [
  HeadComponentInference,
  BeakComponentInference,
  BodyComponentInference,

  LeftWingComponentInference,
  RightWingComponentInference,
  TailComponentInference,
  NeckComponentInference,
  BeakBelongsToHeadInference,
  HeadConnectedToBodyInference,

  HeadConnectedToNeckInference,
  NeckConnectedToBodyInference,

  LeftWingConnectedToBodyInference,
  RightWingConnectedToBodyInference,
  TailConnectedToBodyInference,
    ],
  });



/*test*/
const inferredObservations =
  inferenceEngine.infer(
    semanticObservations
  );

const semanticValidator =
  new SemanticValidator();

const validationObservations =
  semanticValidator.validate([
    ...semanticObservations,
    ...inferredObservations,
  ]);

const completeSemanticObservations = [
  ...semanticObservations,
  ...inferredObservations,
  ...validationObservations,
];

console.table(validationObservations);

const perceptionRuleEngine =
  new PerceptionRuleEngine();

const ruleResults =
  perceptionRuleEngine.evaluate(
    semanticObservations
  );

/*console.table(
  semanticObservations.map((observation) => ({
    predicate: observation.predicate,
    subject: observation.subject,
  }))
);*/
return observation.createPerceptionState({
  semanticObservations:
    completeSemanticObservations,
});

}, [scene, bodyWingTransitionRegions]);


useEffect(() => {
  if (!runtimePerceptionState) return;

  onPerceptionStateChange?.(
    runtimePerceptionState
  );
}, [
  runtimePerceptionState,
  onPerceptionStateChange,
]);

const semanticGraph = useMemo(() => {
  const semanticObservations =
    runtimePerceptionState
      ?.semanticObservations;

  if (
    !Array.isArray(semanticObservations) ||
    semanticObservations.length === 0
  ) {
    return {
      nodes: [],
      edges: [],
    };
  }

  const semanticGraphBuilder =
    new SemanticGraphBuilder();

  return semanticGraphBuilder.build(
    semanticObservations
  );
}, [runtimePerceptionState]);

const semanticSurfaces = useMemo(() => {
  const semanticSurfaceFactory =
    new SemanticSurfaceFactory();

  return semanticSurfaceFactory.build(
    semanticGraph
  );
}, [semanticGraph]);

useEffect(() => {
  console.log("Semantic Surfaces");
  console.table(semanticSurfaces);
}, [semanticSurfaces]);

const leftWingSemanticSurface =
  semanticSurfaces.find(
    (semanticSurface) =>
      semanticSurface.regionId ===
      "LEFT_WING_COMPONENT"
  ) ?? null;

const rightWingSemanticSurface =
  semanticSurfaces.find(
    (semanticSurface) =>
      semanticSurface.regionId ===
      "RIGHT_WING_COMPONENT"
  ) ?? null;

const longitudinalAxis =
  runtimePerceptionState?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_LONGITUDINAL_AXIS"
    )
    ?.value ?? null;

const bodyRegion =
  runtimePerceptionState
    ?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_BODY_REGION"
    )
    ?.value ?? null;

const neckRegion =
  runtimePerceptionState
    ?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_NECK_REGION"
    )
    ?.value ?? null;

const tailRegion =
  runtimePerceptionState
    ?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_TAIL_REGION"
    )
    ?.value ?? null;

const headRegion =
  runtimePerceptionState?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_HEAD_REGION"
    )
    ?.value ?? null;
const headSurface =
  runtimePerceptionState?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_HEAD_SURFACE"
    )
    ?.value ?? null;

const beak =
  runtimePerceptionState?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_BEAK"
    )
    ?.value ?? null;    

const directionField =
  runtimePerceptionState?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_DIRECTION_FIELD"
    )
    ?.value ?? null;    

const leftWingRegion =
  runtimePerceptionState
    ?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_LEFT_WING_REGION"
    )
    ?.value ?? null;

const rightWingRegion =
  runtimePerceptionState
    ?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_RIGHT_WING_REGION"
    )
    ?.value ?? null;

   useFrame(() => {
    if (!scene || !bodyCenterMeshRef.current) return;

    bodyCenterBoxRef.current.setFromObject(scene);

    bodyCenterBoxRef.current.getCenter(
      bodyCenterVectorRef.current
    );

    if (
      layers?.animation &&
      layers?.semanticRegions
    ) {
      const perceptionState =
        createRegionPerceptionState(scene);

      const nextRegions = extractFaceCenters(
        perceptionState,
        {
          reduction: 1,
        }
      );

      setAnimatedBodyWingTransitionRegions(
        nextRegions
      );
    }

    bodyCenterMeshRef.current.position.copy(
      bodyCenterVectorRef.current
    );
  });

  if (!perceptionScene) return null;

 return (
  
<group>
 {layers?.visualEmergence && (
    <DebugVisualEmergence
       scene={scene}
       count={emergenceCount}
       distributionMode={distributionMode}
       organizationFlow={organizationFlow}
       organizationOverlap={organizationOverlap}
       organizationAdaptiveSize={
        organizationAdaptiveSize
      }
    />
   )}

{layers?.visualPriority && (
  <VisualPriorityLayer
    scene={scene}
    distributionMode={distributionMode}
  />
)}

{layers?.visualPriority &&
  longitudinalAxis && (
    <HeadTailAxisDebug
      axis={longitudinalAxis}
    />
  )}

{layers?.headRegion &&
  headRegion && (
    <HeadRegionDebug
      region={headRegion}
      eyeExperiment={eyeExperiment}
    />
  )}
{directionField && (
  <VisualFieldAnalyzerDebug
    fieldValues={directionField}
    binCount={10}
    showSamples
    showPanel
  />
)}
{layers?.headRegion &&
  beak && (
    <BeakDebug beak={beak} />
  )}

{layers?.headSemanticSurface &&
  headSurface && (
    <SemanticHeadPaperPrototype
      semanticSurface={headSurface}
    />
  )}

  {layers?.bodyRegion &&
  neckRegion && (
    <SemanticNeckPaperPrototype
      region={neckRegion}
    />
  )}

 {layers?.bodyRegion &&
  tailRegion && (
    <SemanticTailPaperPrototype
      region={tailRegion}
    />
  )} 

{layers?.bodyRegion &&
  bodyRegion &&
  headRegion && (
    <BodyHeadPaperSkin
      bodyRegion={bodyRegion}
      headRegion={headRegion}
    />
  )}

{layers?.bodyRegion && (
  <>
    <BodySurfaceOrientationDebug
      region={bodyRegion}
      axis={longitudinalAxis}
    />

    <BodySurfaceOrientationDebug
      region={longitudinalAxis?.tailRegion}
      axis={longitudinalAxis}
    />
  </>
)}

{layers?.bodyRegion && (
  <>
<SemanticWingPaperPrototype
  semanticSurface={leftWingSemanticSurface}
/>

<SemanticWingPaperPrototype
  semanticSurface={rightWingSemanticSurface}
/>
  </>
)}

{layers?.wireframe && (
    <primitive object={perceptionScene} />
  )}

      <mesh
        ref={bodyCenterMeshRef}
        visible={Boolean(layers?.landmarks)}
        renderOrder={1000}
      >
        <sphereGeometry args={[0.22, 24, 24]} />

        <meshBasicMaterial
          color="yellow"
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

  {layers?.semanticRegions && (
        <BodyWingTransitionLayer
          regions={
            layers?.animation
              ? animatedBodyWingTransitionRegions
              : bodyWingTransitionRegions
          }
        />
      )}

  {layers?.outline && (
        <OutlineLayer scene={scene} />
      )}

      {layers?.flow && (
        <FlowLayer flow={flow} />
      )}

      {layers?.gesture && (
        <mesh
          position={[0, -0.6, 0]}
          renderOrder={1000}
        >
          <sphereGeometry args={[0.18, 24, 24]} />

          <meshBasicMaterial
            color="yellow"
            depthTest={false}
            depthWrite={false}
          />
        </mesh>
      )}
    
    </group>
  
  
);
  
}