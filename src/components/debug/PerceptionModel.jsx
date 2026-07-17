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

  const semanticObservations = [
    longitudinalAxisExtractor.extract(
      observation
    ),
    headRegionExtractor.extract(
      observation
    ),
  ];

  return observation.createPerceptionState({
    semanticObservations,
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


const longitudinalAxis =
  runtimePerceptionState?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_LONGITUDINAL_AXIS"
    )
    ?.value ?? null;

const bodyRegion =
  longitudinalAxis?.bodyRegion ?? null;
  
const neckRegion =
  longitudinalAxis?.neckRegion ?? null;
  
const tailRegion =
  longitudinalAxis?.tailRegion ?? null;  

const headRegion =
  runtimePerceptionState?.semanticObservations
    ?.find(
      (semanticObservation) =>
        semanticObservation.predicate ===
        "HAS_HEAD_REGION"
    )
    ?.value ?? null;

    const leftWingRegion = {
      faces:
        runtimePerceptionState
          ?.observation
          ?.localWingSpace
          ?.left ?? [],
    };

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

{layers?.headSemanticSurface &&
  headRegion && (
    <SemanticHeadPaperPrototype
      region={headRegion}
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
      wingItems={
        runtimePerceptionState
          ?.observation
          ?.localWingSpace
          ?.left ?? []
      }
    />

    <SemanticWingPaperPrototype
      wingItems={
        runtimePerceptionState
          ?.observation
          ?.localWingSpace
          ?.right ?? []
      }
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