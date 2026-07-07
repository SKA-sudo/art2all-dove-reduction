import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import FlowLayer from "./layers/FlowLayer";
import BodyWingTransitionLayer from "./layers/BodyWingTransitionLayer";

import { extractFlow } from "../../core/perception/FlowExtractor";
import { extractBodyWingTransition } from "../../core/perception/BodyWingTransitionExtractor";
import { createPerceptionState } from "../../core/perception/PerceptionState";
import OutlineLayer from "./layers/OutlineLayer";

export default function PerceptionModel({ scene, layers }) {
  const bodyCenterMeshRef = useRef();
  const bodyCenterBoxRef = useRef(new THREE.Box3());
  const bodyCenterVectorRef = useRef(new THREE.Vector3());
  const [animatedBodyWingTransitionRegions, setAnimatedBodyWingTransitionRegions] =
  useState([]);

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
      normalLength: 1.5,
    });
  }, [scene]);

  const bodyWingTransitionRegions = useMemo(() => {
  const perceptionState = createPerceptionState(scene);

  return extractBodyWingTransition(perceptionState, {
    reduction: 1,
  });
  }, [scene]);

  useFrame(() => {
    if (!scene || !bodyCenterMeshRef.current) return;

    bodyCenterBoxRef.current.setFromObject(scene);
    bodyCenterBoxRef.current.getCenter(bodyCenterVectorRef.current);
      if (layers?.animation && layers?.semanticRegions) {
        const perceptionState = createPerceptionState(scene);

      const nextRegions = extractBodyWingTransition(perceptionState, {
        reduction: 1,
      });
        setAnimatedBodyWingTransitionRegions(nextRegions);
      }
     bodyCenterMeshRef.current.position.copy(bodyCenterVectorRef.current);
    }, 1);

  if (!perceptionScene) return null;

  return (
    <group>
      {layers?.wireframe && <primitive object={perceptionScene} />}

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

      {layers?.outline && <OutlineLayer scene={scene} />}

      {layers?.flow && <FlowLayer flow={flow} />}

      {layers?.gesture && (
        <mesh position={[0, -0.6, 0]} renderOrder={1000}>
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