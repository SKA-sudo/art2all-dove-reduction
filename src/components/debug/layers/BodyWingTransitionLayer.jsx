import { useMemo } from "react";
import * as THREE from "three";

export default function BodyWingTransitionLayer({ regions }) {
  const geometry = useMemo(() => {
    if (!regions?.length) return null;

    const points = regions.map((region) => region.position);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [regions]);

  if (!geometry) return null;

  return (
    <points geometry={geometry} renderOrder={1000}>
      <pointsMaterial
        color="orange"
        size={0.08}
        sizeAttenuation={true}
        depthTest={false}
        depthWrite={false}
        transparent
        opacity={0.9}
        toneMapped={false}
      />
    </points>
  );
}