import { Line, Sphere } from "@react-three/drei";

export default function GDLDebug({ gdl, showPrimaryAxis = true }) {
  if (!gdl) return null;
  console.log("GDLDebug axis points:", gdl.axis?.points);
  console.log("showPrimaryAxis:", showPrimaryAxis);
  console.log("Axis Points", gdl.axis.points);
  console.log("WingSpace Left", gdl.wingSpace.left);
  console.log("WingSpace Right", gdl.wingSpace.right);

  function logBounds(label, points) {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const zs = points.map((p) => p.z);

  console.log(
  `${label}: count=${points.length}, ` +
    `x=${Math.min(...xs).toFixed(3)}..${Math.max(...xs).toFixed(3)}, ` +
    `y=${Math.min(...ys).toFixed(3)}..${Math.max(...ys).toFixed(3)}, ` +
    `z=${Math.min(...zs).toFixed(3)}..${Math.max(...zs).toFixed(3)}`
);
}

logBounds("Axis Bounds", gdl.axis.points);
logBounds("WingSpace Left Bounds", gdl.wingSpace.left);
logBounds("WingSpace Right Bounds", gdl.wingSpace.right);
  return (
    <>
      {showPrimaryAxis && (
        <>
          <Line
            points={gdl.axis.points}
            color="yellow"
            lineWidth={18}
            depthTest={false}
            renderOrder={999}
          />

          {gdl.axis.points.map((point, index) => (
            
            <Sphere
              key={`axis-${index}`}
              position={point}
              args={[0.06, 12, 12]}
              renderOrder={1000}
            >
              <meshBasicMaterial
              color="yellow"
              depthTest={false}
              transparent={false}
            />
            </Sphere >
            
          ))}
          
        </>
        
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