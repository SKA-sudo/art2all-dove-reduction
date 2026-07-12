import { useMemo } from "react";
import * as THREE from "three";

const MARKER_SIZE = 0.08;

const HEAD_COLOR = "#ff00ff";
const BODY_COLOR = "#ffff00";
const TAIL_COLOR = "#0000ff";
const AXIS_COLOR = "#ffffff";

/*
 * R5.4 – Semantic Longitudinal Axis Debug
 *
 * Visualisiert ausschließlich die validierte
 * Semantic Observation:
 *
 * WholeDove HAS_LONGITUDINAL_AXIS
 *
 * Keine Bounding-Box-Auswertung.
 * Keine eigene Head- oder Tail-Heuristik.
 */

export default function HeadTailAxisDebug({
  axis,
}) {
  const debugGeometry = useMemo(() => {
    const headCenter =
      axis?.headReference?.center;

    const bodyCenter =
      axis?.bodyReference?.center;

    const tailCenter =
      axis?.tailReference?.center;

    if (
      !headCenter ||
      !bodyCenter ||
      !tailCenter
    ) {
      return null;
    }

    const headReference =
      headCenter.clone();

    const bodyReference =
      bodyCenter.clone();

    const tailReference =
      tailCenter.clone();

    const axisGeometry =
      new THREE.BufferGeometry().setFromPoints([
        tailReference,
        bodyReference,
        headReference,
      ]);

    return {
      axisGeometry,
      headReference,
      bodyReference,
      tailReference,
    };
  }, [axis]);

  if (!debugGeometry) {
    return null;
  }

  return (
    <group>
      {/* Semantic longitudinal axis */}
      <line
        geometry={debugGeometry.axisGeometry}
        renderOrder={1500}
      >
        <lineBasicMaterial
          color={AXIS_COLOR}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </line>

      {/* Tail Reference */}
      <mesh
        position={debugGeometry.tailReference}
        renderOrder={1501}
      >
        <sphereGeometry
          args={[MARKER_SIZE, 20, 20]}
        />

        <meshBasicMaterial
          color={TAIL_COLOR}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Body Reference */}
      <mesh
        position={debugGeometry.bodyReference}
        renderOrder={1501}
      >
        <sphereGeometry
          args={[MARKER_SIZE, 20, 20]}
        />

        <meshBasicMaterial
          color={BODY_COLOR}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Head Reference */}
      <mesh
        position={debugGeometry.headReference}
        renderOrder={1501}
      >
        <sphereGeometry
          args={[MARKER_SIZE, 20, 20]}
        />

        <meshBasicMaterial
          color={HEAD_COLOR}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}