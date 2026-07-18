import { useMemo } from "react";
import * as THREE from "three";

export default function BeakDebug({ beak }) {
  const geometry = useMemo(() => {
    if (
      !(beak?.center instanceof THREE.Vector3) ||
      !(beak?.tip instanceof THREE.Vector3)
    ) {
      return null;
    }

    return new THREE.BufferGeometry().setFromPoints([
      beak.center,
      beak.tip,
    ]);
  }, [beak]);

  if (!beak || !geometry) {
    return null;
  }

  return (
    <group renderOrder={1000}>
      <line geometry={geometry}>
        <lineBasicMaterial
          color="yellow"
          depthTest={false}
          depthWrite={false}
        />
      </line>

      <mesh position={beak.center}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial
          color="orange"
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      <mesh position={beak.tip}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="yellow"
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}