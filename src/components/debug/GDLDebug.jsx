import { Line, Sphere } from "@react-three/drei";

const SHOW_WING_SPACE = true;
const SHOW_GESTURES = true;
const SHOW_WING_CURVES = true;

export default function GDLDebug({ gdl, showPrimaryAxis = true }) {
  if (!gdl) return null;

  return (
    <>
      {showPrimaryAxis && (
        <Line
          points={gdl.axis.points}
          color="yellow"
          lineWidth={4}
        />
      )}

      {SHOW_WING_SPACE && (
        <>
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
        </>
      )}

      {SHOW_GESTURES &&
        gdl.gestures.map((gesture, index) => (
          <Line
            key={`gesture-${index}`}
            points={gesture.points}
            color="orange"
            lineWidth={2}
          />
        ))}

      {SHOW_WING_CURVES &&
        gdl.wingFingerCurves.map((curve, index) => (
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