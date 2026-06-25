import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";


/* -------------------- LIGHT RAYS -------------------- */
export default function LightRays() {
  const ref = useRef();
  const texture = useTexture("/textures/godrays.png");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;

    ref.current.rotation.z = Math.sin(t * 0.05) * 0.03;

    ref.current.material.opacity =
      0.25 + Math.sin(t * 0.6) * 0.08;
  });

  return (
    <mesh ref={ref} position={[0, 15, -30]}>
      <planeGeometry args={[300, 300]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        opacity={0.35}
      />
    </mesh>
  );
}