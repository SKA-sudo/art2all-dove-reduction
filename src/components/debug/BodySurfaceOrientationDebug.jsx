import * as THREE from "three";

const FACE_MARKER_SIZE = 0.014;

function getOrientationColor(value) {
  const hue = (1 - value) * 0.33;

  return new THREE.Color().setHSL(
    hue,
    1,
    0.5
  );
}

export default function BodySurfaceOrientationDebug({
  region,
  axis,
}) {
  const faces = region?.faces ?? [];

  if (!axis || faces.length === 0) {
    return null;
  }

  const direction =
    axis.direction.clone().normalize();

  return (
    <group>
      {faces.map((face, index) => {
        if (!face.normal) return null;

        const normal =
          face.normal.clone().normalize();

        const alignment =
          Math.abs(
            normal.dot(direction)
          );

        const color =
          getOrientationColor(alignment);

        return (
          <mesh
            key={face.id ?? index}
            position={face.center}
            renderOrder={1700}
          >
            <sphereGeometry
              args={[
                FACE_MARKER_SIZE,
                10,
                10,
              ]}
            />

            <meshBasicMaterial
              color={color}
              depthTest={false}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}