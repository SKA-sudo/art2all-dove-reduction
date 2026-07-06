import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PerceptionModel({ scene, layers }) {
  const bodyCenterMeshRef = useRef();
  const bodyCenterBoxRef = useRef(new THREE.Box3());
  const bodyCenterVectorRef = useRef(new THREE.Vector3());

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

  useFrame(() => {
    if (!scene || !bodyCenterMeshRef.current) return;

    bodyCenterBoxRef.current.setFromObject(scene);
    bodyCenterBoxRef.current.getCenter(bodyCenterVectorRef.current);

    bodyCenterMeshRef.current.position.copy(bodyCenterVectorRef.current);
  });

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