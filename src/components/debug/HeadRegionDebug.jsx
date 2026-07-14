import { useMemo } from "react";
import * as THREE from "three";

import { buildHeadAxis } from "../../utils/HeadAxisBuilder";

const HEAD_REGION_COLOR = "#ff00ff";
const FACE_MARKER_SIZE = 0.012;
const AXIS_MARKER_SIZE = 0.06;
const LOCAL_AXIS_LENGTH = 0.4;

export default function HeadRegionDebug({
  region,
  eyeExperiment,
}) {
  const faces = region?.faces ?? [];

  const {
    visible: eyeVisible = true,
    axisOffset = 0.35,
    verticalOffset = 0.05,
    size: eyeSize = 0.04,
  } = eyeExperiment ?? {};

  const markers = buildHeadAxis({
    faces,
  });

  const localHeadSpace = useMemo(() => {
    if (!markers) {
      return null;
    }

    const direction = markers.direction
      .clone()
      .normalize();

    const worldUp = new THREE.Vector3(0, 1, 0);

    let localRight = new THREE.Vector3()
      .crossVectors(direction, worldUp);

    /*
     * Falls Head Axis und World Up fast parallel sind,
     * wäre das Kreuzprodukt nahezu null.
     */
    if (localRight.lengthSq() < 0.000001) {
      localRight = new THREE.Vector3()
        .crossVectors(
          direction,
          new THREE.Vector3(0, 0, 1)
        );
    }

    localRight.normalize();

    const localUp = new THREE.Vector3()
      .crossVectors(localRight, direction)
      .normalize();

    return {
      direction,
      localRight,
      localUp,
    };
  }, [markers]);

  const eyeCandidate = useMemo(() => {
    if (!markers || !localHeadSpace) {
      return null;
    }

    return markers.center
      .clone()
      .addScaledVector(
        localHeadSpace.direction,
        axisOffset
      )
      .addScaledVector(
        localHeadSpace.localUp,
        verticalOffset
      );
  }, [
    markers,
    localHeadSpace,
    axisOffset,
    verticalOffset,
  ]);

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

  const localUpGeometry = useMemo(() => {
    if (!markers || !localHeadSpace) {
      return null;
    }

    return new THREE.BufferGeometry().setFromPoints([
      markers.center,
      markers.center
        .clone()
        .addScaledVector(
          localHeadSpace.localUp,
          LOCAL_AXIS_LENGTH
        ),
    ]);
  }, [markers, localHeadSpace]);

  const localRightGeometry = useMemo(() => {
    if (!markers || !localHeadSpace) {
      return null;
    }

    return new THREE.BufferGeometry().setFromPoints([
      markers.center,
      markers.center
        .clone()
        .addScaledVector(
          localHeadSpace.localRight,
          LOCAL_AXIS_LENGTH
        ),
    ]);
  }, [markers, localHeadSpace]);

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

      {localUpGeometry && (
        <line
          geometry={localUpGeometry}
          renderOrder={2600}
        >
          <lineBasicMaterial
            color="lime"
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </line>
      )}

      {localRightGeometry && (
        <line
          geometry={localRightGeometry}
          renderOrder={2600}
        >
          <lineBasicMaterial
            color="cyan"
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </line>
      )}

      {eyeVisible && eyeCandidate && (
        <mesh
          position={eyeCandidate}
          renderOrder={3100}
        >
          <sphereGeometry
            args={[
              eyeSize,
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