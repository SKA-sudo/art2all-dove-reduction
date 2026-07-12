import { useMemo } from "react";
import * as THREE from "three";

const MARKER_SIZE = 0.08;

const HEAD_COLOR = "#ff00ff";
const TAIL_COLOR = "#0000ff";
const AXIS_COLOR = "#ffffff";

/*
 * R5.3d – Head–Tail Axis Debug
 *
 * Visualisiert die semantische Längsrichtung
 * des aktuellen Referenzmodells.
 *
 * Validierte Koordinatenbeobachtung:
 *
 * minZ -> Schwanzseite
 * maxZ -> Kopfseite
 *
 * Die Marker stellen vorläufige semantische
 * Referenzpunkte dar. Sie sind noch keine
 * automatisch extrahierten Kopf- oder Schwanzzentren.
 */

export default function HeadTailAxisDebug({
  scene,
}) {
  const debugGeometry = useMemo(() => {
    if (!scene) return null;

    scene.updateMatrixWorld(true);

    const worldToScene = new THREE.Matrix4()
      .copy(scene.matrixWorld)
      .invert();

    const points = [];

    scene.traverse((child) => {
      if (!child.isMesh || !child.geometry) {
        return;
      }

      const positionAttribute =
        child.geometry.getAttribute("position");

      if (!positionAttribute) {
        return;
      }

      const point = new THREE.Vector3();

      for (
        let vertexIndex = 0;
        vertexIndex < positionAttribute.count;
        vertexIndex += 12
      ) {
        if (
          typeof child.getVertexPosition ===
          "function"
        ) {
          child.getVertexPosition(
            vertexIndex,
            point
          );
        } else {
          point.fromBufferAttribute(
            positionAttribute,
            vertexIndex
          );
        }

        point
          .applyMatrix4(child.matrixWorld)
          .applyMatrix4(worldToScene);

        points.push(point.clone());
      }
    });

    if (points.length === 0) {
      return null;
    }

    const bounds =
      new THREE.Box3().setFromPoints(points);

    const boundsCenter = new THREE.Vector3();
    bounds.getCenter(boundsCenter);

    /*
     * Vorläufige semantische Referenzen:
     *
     * Tail Reference = minZ
     * Head Reference = maxZ
     */
    const tailReference = new THREE.Vector3(
      boundsCenter.x,
      boundsCenter.y,
      bounds.min.z
    );

    const headReference = new THREE.Vector3(
      boundsCenter.x,
      boundsCenter.y,
      bounds.max.z
    );

    const axisGeometry =
      new THREE.BufferGeometry().setFromPoints([
        tailReference,
        headReference,
      ]);

    return {
      axisGeometry,
      tailReference,
      headReference,
    };
  }, [scene]);

  if (!debugGeometry) {
    return null;
  }

  return (
    <group>
      {/* Head–Tail Axis */}
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