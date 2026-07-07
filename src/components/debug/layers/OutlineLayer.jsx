import * as THREE from "three";
import { useMemo } from "react";

export default function OutlineLayer({ scene }) {
  const outlineScene = useMemo(() => {
    if (!scene) return null;

    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;

      child.material = new THREE.MeshBasicMaterial({
        color: "#00ffff",
        wireframe: true,
        transparent: true,
        opacity: 1,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
    });

    return clone;
  }, [scene]);

  if (!outlineScene) return null;

  return <primitive object={outlineScene} renderOrder={1200} />;
}   