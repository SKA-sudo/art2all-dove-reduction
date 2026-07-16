import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import { createRoundedPlane } from "../utils/RoundedPlaneGeometry";

export default function Paper({
  position,
  normal,
  flowDirection = null,
  rotation = 0,
  flow = 0,
  image,
  scale,
}) {
  const geometry = useMemo(() => {
    return createRoundedPlane(
      1,
      1,
      0.08,
      12
    );
  }, []);

  const texture = useTexture(image);

  const quaternion = useMemo(() => {
    if (!normal) {
      return new THREE.Quaternion();
    }

    const surfaceNormal = normal
      .clone()
      .normalize();

    /*
     * Neuer semantischer Weg:
     *
     * X-Achse des Papers = Flow
     * Y-Achse des Papers = Spread
     * Z-Achse des Papers = Surface Normal
     */
    if (
      flowDirection instanceof THREE.Vector3
    ) {
      const tangent = flowDirection
        .clone()
        .sub(
          surfaceNormal
            .clone()
            .multiplyScalar(
              flowDirection.dot(
                surfaceNormal
              )
            )
        );

      if (
        tangent.lengthSq() >
        Number.EPSILON
      ) {
        tangent.normalize();

        const spread =
          new THREE.Vector3()
            .crossVectors(
              surfaceNormal,
              tangent
            )
            .normalize();

        const basis =
          new THREE.Matrix4().makeBasis(
            tangent,
            spread,
            surfaceNormal
          );

        const baseQuaternion =
          new THREE.Quaternion()
            .setFromRotationMatrix(basis);

        const twist =
          new THREE.Quaternion()
            .setFromAxisAngle(
              surfaceNormal,
              THREE.MathUtils.degToRad(
                rotation
              )
            );

        return baseQuaternion.multiply(
          twist
        );
      }
    }

    /*
     * Bestehender Fallback:
     * normale Oberflächenausrichtung
     * plus numerischer Flow-Winkel.
     */
    const align =
      new THREE.Quaternion()
        .setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          surfaceNormal
        );

    const twist =
      new THREE.Quaternion()
        .setFromAxisAngle(
          surfaceNormal,
          THREE.MathUtils.degToRad(
            flow + rotation
          )
        );

    return align.multiply(twist);
  }, [
    normal,
    flowDirection,
    rotation,
    flow,
  ]);

  return (
    <group
      position={position}
      quaternion={quaternion}
      rotation={
        !normal
          ? [0, 0, rotation]
          : undefined
      }
    >
      <mesh
        geometry={geometry}
        scale={
          scale ?? [1.4, 0.9, 1]
        }
      >
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}