import { useMemo } from "react";
import * as THREE from "three";

import { buildHeadAxis } from "../../utils/HeadAxisBuilder";

const HEAD_REGION_COLOR = "#ff00ff";
const FACE_MARKER_SIZE = 0.012;
const AXIS_MARKER_SIZE = 0.06;
const EYE_MARKER_SIZE = 0.04;

export default function HeadRegionDebug({
  region,
}) {
  const faces = region?.faces ?? [];

  const markers = buildHeadAxis({
    faces,
  });

  const eyeCandidate = useMemo(() => {
    if (!markers) {
      return null;
    }

    const direction = markers.direction.clone();

    const eye = markers.center
      .clone()
      .add(direction.multiplyScalar(0.35));

    eye.y += 0.05;

    return eye;
  }, [markers]);

  const axisGeometry = useMemo(() => {
    if (!markers) {
      return null;
    }

    return new THREE.BufferGeometry().setFromPoints([
      markers.rear,
      markers.center,
      markers.front,
    ]);
  }, [markers]);

  if (faces.length === 0) {
    return null;
  }

  return (
    <group>
      {faces.map((face, index) => {
        if (!face?.center) {
          return null;
        }

        return (
          <mesh
            key={
              face.id ??
              `head-region-face-${index}`
            }
            position={face.center}
            renderOrder={1600}
          >
            <sphereGeometry
              args={[
                FACE_MARKER_SIZE,
                10,
                10,
              ]}
            />

            <meshBasicMaterial
              color={HEAD_REGION_COLOR}
              transparent
              opacity={0.9}
              depthTest={false}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      {axisGeometry && (
        <line
          geometry={axisGeometry}
          renderOrder={2500}
        >
          <lineBasicMaterial
            color="white"
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </line>
      )}

      {eyeCandidate && (
        <mesh
          position={eyeCandidate}
          renderOrder={3100}
        >
          <sphereGeometry
            args={[
              EYE_MARKER_SIZE,
              20,
              20,
            ]}
          />

          <meshBasicMaterial
            color="lime"
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}

      {markers && (
        <>
          <mesh
            position={markers.rear}
            renderOrder={3000}
          >
            <sphereGeometry
              args={[
                AXIS_MARKER_SIZE,
                20,
                20,
              ]}
            />

            <meshBasicMaterial
              color="red"
              depthTest={false}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>

          <mesh
            position={markers.center}
            renderOrder={3000}
          >
            <sphereGeometry
              args={[
                AXIS_MARKER_SIZE,
                20,
                20,
              ]}
            />

            <meshBasicMaterial
              color="yellow"
              depthTest={false}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>

          <mesh
            position={markers.front}
            renderOrder={3000}
          >
            <sphereGeometry
              args={[
                AXIS_MARKER_SIZE,
                20,
                20,
              ]}
            />

            <meshBasicMaterial
              color="blue"
              depthTest={false}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </>
      )}
    </group>
  );
}