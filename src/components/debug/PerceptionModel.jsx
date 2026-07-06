import { useMemo } from "react";
import * as THREE from "three";
import LandmarkLayer from "./layers/LandmarkLayer";

export default function PerceptionModel({ scene, layers }) {
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

  const landmarks = useMemo(() => {
  if (!scene) return [];

  const box = new THREE.Box3().setFromObject(scene);
  const center = new THREE.Vector3();

  box.getCenter(center);

  return [
    {
      name: "Body Center",
      position: center,
      color: "yellow",
    },
  ];
}, [scene]);

  if (!perceptionScene) return null;

  return (
    <group>
      {layers?.wireframe && <primitive object={perceptionScene} />}
      {layers?.landmarks && <LandmarkLayer landmarks={landmarks} />}


      {layers?.semanticRegions && (
  <mesh position={[0, 0.6, 0]} renderOrder={1000}>
    <sphereGeometry args={[0.18, 24, 24]} />
    <meshBasicMaterial color="orange" depthTest={false} depthWrite={false} />
  </mesh>
)}

{layers?.outline && (
  <mesh position={[0.5, 0, 0]} renderOrder={1000}>
    <sphereGeometry args={[0.18, 24, 24]} />
    <meshBasicMaterial color="cyan" depthTest={false} depthWrite={false} />
  </mesh>
)}

{layers?.flow && (
  <mesh position={[-0.5, 0, 0]} renderOrder={1000}>
    <sphereGeometry args={[0.18, 24, 24]} />
    <meshBasicMaterial color="lime" depthTest={false} depthWrite={false} />
  </mesh>
)}

{layers?.gesture && (
  <mesh position={[0, -0.6, 0]} renderOrder={1000}>
    <sphereGeometry args={[0.18, 24, 24]} />
    <meshBasicMaterial color="yellow" depthTest={false} depthWrite={false} />
  </mesh>
)}
    </group>
  );
}