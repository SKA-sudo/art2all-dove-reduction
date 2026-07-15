import * as THREE from "three";

const FACE_MARKER_SIZE = 0.014;

function getDistanceColor(normalizedDistance) {
  const value = THREE.MathUtils.clamp(
    normalizedDistance ?? 0,
    0,
    1
  );

  const hue = (1 - value) * 0.33;

  return new THREE.Color().setHSL(
    hue,
    1,
    0.5
  );
}

export default function BodyRegionDebug({
  region,
}) {
  const observations =
    region?.experiment?.observations ?? [];

  if (observations.length === 0) {
    return null;
  }

  return (
    <group>
      {observations.map(
        (
          {
            face,
            normalizedDistance,
          },
          index
        ) => {
          if (!face?.center) {
            return null;
          }

          const color =
            getDistanceColor(
              normalizedDistance
            );

          return (
            <mesh
              key={
                face.id ??
                `body-axis-distance-${index}`
              }
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
                transparent
                opacity={0.95}
                depthTest={false}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          );
        }
      )}
    </group>
  );
}