import { Line } from "@react-three/drei";

export function GestureTreeDebug({ flowCurves = [] }) {
  if (!flowCurves.length) return null;

  return (
    <group>
      {flowCurves.map((curve) => (
        <Line
          key={curve.id}
          points={curve.points}
          color="orange"
          lineWidth={3}
        />
      ))}
    </group>
  );
}