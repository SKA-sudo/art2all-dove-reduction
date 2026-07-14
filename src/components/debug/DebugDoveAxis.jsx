import * as THREE from "three";
import { useMemo } from "react";

export default function DebugDoveAxis({ axis }) {
  const geometry = useMemo(() => {
    if (!axis) return null;

    const points = [
      axis.leftWingTip.center,
      axis.leftShoulder.center,
      axis.bodyCenter.center,
      axis.rightShoulder.center,
      axis.rightWingTip.center,
    ];

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [axis]);

  if (!axis || !geometry) return null;

  const debugPoints = [
    { face: axis.leftWingTip, color: "blue", size: 0.22 },
    { face: axis.leftShoulder, color: "lime", size: 0.18 },
    { face: axis.bodyCenter, color: "white", size: 0.26 },
    { face: axis.rightShoulder, color: "lime", size: 0.18 },
    { face: axis.rightWingTip, color: "red", size: 0.22 },
  ];

  return (
    <group renderOrder={999}>
      <line geometry={geometry}>
        <lineBasicMaterial
          color="yellow"
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </line>

      {debugPoints.map((p, index) => (
        <mesh key={index} position={p.face.center} renderOrder={1000}>
          <sphereGeometry args={[p.size, 24, 24]} />
          <meshBasicMaterial
            color={p.color}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}