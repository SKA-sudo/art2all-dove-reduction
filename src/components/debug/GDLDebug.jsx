import { Line, Sphere } from "@react-three/drei";

export default function GDLDebug({ gdl, showPrimaryAxis = true }) {
  if (!gdl) return null;
  console.log("GDLDebug axis points:", gdl.axis?.points);
  console.log("showPrimaryAxis:", showPrimaryAxis);

  return (
    <>
      {showPrimaryAxis && (
        <Line
  points={gdl.axis.points}
  color="white"
  lineWidth={10}
  depthTest={false}
/>
      )}

      {gdl.wingSpace.left.map((point, index) => (
        <Sphere key={`left-${index}`} position={point} args={[0.035, 6, 6]}>
          <meshBasicMaterial color="cyan" />
        </Sphere>
      ))}

      {gdl.wingSpace.right.map((point, index) => (
        <Sphere key={`right-${index}`} position={point} args={[0.035, 6, 6]}>
          <meshBasicMaterial color="magenta" />
        </Sphere>
      ))}

      {gdl.gestures.map((gesture, index) => (
        <Line
          key={`gesture-${index}`}
          points={gesture.points}
          color="orange"
          lineWidth={2}
        />
      ))}

      {gdl.wingFingerCurves.map((curve, index) => (
        <Line
          key={`curve-${index}`}
          points={curve.points}
          color="lime"
          lineWidth={1}
        />
      ))}
    </>
  );
}