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
    { face: axis.leftWingTip, color: "blue", size: 0.14 },
    { face: axis.leftShoulder, color: "lime", size: 0.12 },
    { face: axis.bodyCenter, color: "white", size: 0.16 },
    { face: axis.rightShoulder, color: "lime", size: 0.12 },
    { face: axis.rightWingTip, color: "red", size: 0.14 },
  ];

  return (
    <group>
      <line geometry={geometry}>
        <lineBasicMaterial color="yellow" />
      </line>

      {debugPoints.map((p, index) => (
        <mesh key={index} position={p.face.center}>
          <sphereGeometry args={[p.size, 16, 16]} />
          <meshBasicMaterial color={p.color} />
        </mesh>
      ))}
    </group>
  );
}