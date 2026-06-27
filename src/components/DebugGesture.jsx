import * as THREE from "three";
import { useMemo } from "react";

export default function DebugGesture({
  shoulder,
  wingTip,
  points,
  colors,
}) {
  // --------------------------------------------
  // Kompatibilität mit altem Code
  // --------------------------------------------
  const debugPoints = useMemo(() => {
    if (points?.length) return points;

    if (shoulder && wingTip) {
      return [shoulder.center, wingTip.center];
    }

    return null;
  }, [points, shoulder, wingTip]);

  const debugColors = useMemo(() => {
    if (colors?.length) return colors;

    return ["red", "blue"];
  }, [colors]);

  const geometry = useMemo(() => {
    if (!debugPoints) return null;

    return new THREE.BufferGeometry().setFromPoints(debugPoints);
  }, [debugPoints]);

  if (!geometry || !debugPoints) return null;

  return (
    <>
      {debugPoints.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial
            color={debugColors[index] ?? "white"}
          />
        </mesh>
      ))}

      <line geometry={geometry}>
        <lineBasicMaterial color="yellow" />
      </line>
    </>
  );
}