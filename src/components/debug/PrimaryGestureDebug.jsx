import { Line } from "@react-three/drei";

export function PrimaryGestureDebug({ gestures = [] }) {
  if (!gestures.length) return null;

  return (
    <group>
      {gestures.map((gesture) => (
        <Line
          key={gesture.id}
          points={gesture.points}
          color="yellow"
          lineWidth={5}
        />
      ))}
    </group>
  );
}

