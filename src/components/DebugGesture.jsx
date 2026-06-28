import * as THREE from "three";
import { useMemo } from "react";

export default function DebugGesture({
  shoulder,
  wingTip,
  points,
  colors,
  leftTransitionRegion = [],
  rightTransitionRegion = [],
  leftShoulder,
  rightShoulder,
  localWingSpace,
}) {
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

  const localWingDebugItems = useMemo(() => {
    const left = localWingSpace?.left ?? [];
    const right = localWingSpace?.right ?? [];

    return [...left, ...right]
      .filter((_, index) => index % 8 === 0)
      .map((item, index) => {
        return {
          key: `local-wing-space-${index}`,
          center: item.center,
          flowGeometry: new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            item.flow.clone().multiplyScalar(1.2),
          ]),
          spreadGeometry: new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            item.spread.clone().multiplyScalar(0.45),
          ]),
          normalGeometry: new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            item.normal.clone().multiplyScalar(0.35),
          ]),
        };
      });
  }, [localWingSpace]);

  if (!geometry || !debugPoints) return null;

  return (
    <>
      {/* Primary Dove Axis Punkte */}
      {debugPoints.map((point, index) => (
        <mesh key={`axis-${index}`} position={point}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color={debugColors[index] ?? "white"} />
        </mesh>
      ))}

      {/* Verbindungslinie */}
      <line geometry={geometry}>
        <lineBasicMaterial color="yellow" />
      </line>

      {/* Linke Transition Region */}
      {leftTransitionRegion.map((face, index) => {
        const isShoulder =
          leftShoulder &&
          face.center.distanceTo(leftShoulder.center) < 0.0001;

        return (
          <group key={`left-transition-${index}`} position={face.center}>
            <mesh>
              <sphereGeometry args={[isShoulder ? 0.08 : 0.04, 10, 10]} />
              <meshBasicMaterial color={isShoulder ? "yellow" : "orange"} />
            </mesh>
          </group>
        );
      })}

      {/* Rechte Transition Region */}
      {rightTransitionRegion.map((face, index) => {
        const isShoulder =
          rightShoulder &&
          face.center.distanceTo(rightShoulder.center) < 0.0001;

        return (
          <group key={`right-transition-${index}`} position={face.center}>
            <mesh>
              <sphereGeometry args={[isShoulder ? 0.08 : 0.04, 10, 10]} />
              <meshBasicMaterial color={isShoulder ? "lime" : "cyan"} />
            </mesh>
          </group>
        );
      })}

      {/* Local Wing Space Debug - Flow Only */}
{localWingDebugItems
  .filter((_, index) => index % 4 === 0) // weniger Linien
  .map((item) => (
    <group key={item.key} position={item.center}>
      <line geometry={item.flowGeometry}>
        <lineBasicMaterial
          color="lime"
          linewidth={3}
        />
      </line>
    </group>
))}
    </>
  );
}