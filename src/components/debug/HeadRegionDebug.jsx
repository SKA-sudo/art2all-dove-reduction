  import { useMemo } from "react";
  import * as THREE from "three";

  import { buildHeadAxis } from "../../utils/HeadAxisBuilder";

  const HEAD_REGION_COLOR = "#ff00ff";
  const EYE_ZONE_COLOR = "#00ffff";
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

    const markers = useMemo(() => {
      return buildHeadAxis({
        faces,
      });
    }, [faces]);

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
          localHeadSpace.localRight,
          verticalOffset
        );
    }, [
      markers,
      localHeadSpace,
      axisOffset,
      verticalOffset,
    ]);

    const eyeZoneFaces = useMemo(() => {
    const validFaces = faces.filter(
      (face) =>
        face?.center instanceof THREE.Vector3
    );

    if (validFaces.length === 0) {
      return [];
    }

    const bounds = new THREE.Box3();

    validFaces.forEach((face) => {
      bounds.expandByPoint(face.center);
    });

    const size = bounds.getSize(
      new THREE.Vector3()
    );

    if (
      size.y <= Number.EPSILON ||
      size.z <= Number.EPSILON
    ) {
      return [];
    }

    return validFaces.filter((face) => {
      const yRatio =
        (face.center.y - bounds.min.y) /
        size.y;

      const zRatio =
        (face.center.z - bounds.min.z) /
        size.z;

      return (
        yRatio >= 0.55 &&
        zRatio >= 0.2 &&
        zRatio <= 0.8
      );
    });
  }, [faces]);

    const projectedEyeCandidate = useMemo(() => {
    if (
      !eyeCandidate ||
      !markers ||
      eyeZoneFaces.length === 0
    ) {
      return null;
    }

    let nearestFace = null;
    let nearestDistance = Infinity;

    for (const face of eyeZoneFaces) {
      const distance =
        face.center.distanceTo(eyeCandidate);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestFace = face;
      }
    }

    if (!nearestFace?.center) {
      return null;
    }

    const outwardDirection = nearestFace.center
      .clone()
      .sub(markers.center)
      .normalize();

    return nearestFace.center
      .clone()
      .addScaledVector(
        outwardDirection,
        0.03
      );
  }, [
    eyeCandidate,
    eyeZoneFaces,
    markers,
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

    if (faces.length === 0 || !markers) {
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

  {eyeZoneFaces.map((face, index) => (
    <mesh
      key={
        face.id ??
        `eye-zone-face-${index}`
      }
      position={face.center}
      renderOrder={2200}
    >
      <sphereGeometry
        args={[
          FACE_MARKER_SIZE * 1.6,
          12,
          12,
        ]}
      />

      <meshBasicMaterial
        color={EYE_ZONE_COLOR}
        transparent
        opacity={1}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  ))}

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

        {eyeVisible && projectedEyeCandidate && (
          <mesh
            position={projectedEyeCandidate}
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
      </group>
    );
  }