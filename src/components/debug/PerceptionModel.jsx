import { useMemo } from "react";
import * as THREE from "three";
import DebugDoveAxis from "../../utils/DebugDoveAxis";

export default function PerceptionModel({ scene, showPrimaryAxis }) {
  const { perceptionScene, primaryAxis } = useMemo(() => {
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

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const y = center.y + size.y * 0.15;
    const z = center.z;

    const primaryAxis = {
      leftWingTip: {
        center: new THREE.Vector3(box.min.x, y, z),
      },
      leftShoulder: {
        center: new THREE.Vector3(center.x - size.x * 0.25, y, z),
      },
      bodyCenter: {
        center,
      },
      rightShoulder: {
        center: new THREE.Vector3(center.x + size.x * 0.25, y, z),
      },
      rightWingTip: {
        center: new THREE.Vector3(box.max.x, y, z),
      },
    };

    return {
      perceptionScene: clone,
      primaryAxis,
    };
  }, [scene]);

  return (
    <group>
      <primitive object={perceptionScene} />

      {showPrimaryAxis && <DebugDoveAxis axis={primaryAxis} />}
    </group>
  );
}