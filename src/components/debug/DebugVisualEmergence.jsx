import { useMemo } from "react";
import * as THREE from "three";

const PAPER_WIDTH = 0.055;
const PAPER_HEIGHT = 0.035;

/**
 * R5.2 – Visual Emergence Experiment
 *
 * Visualisiert eine kontrollierbare Anzahl einfacher weißer Flächen
 * auf der Oberfläche des Referenzmodells.
 *
 * Diese Komponente erzeugt keine Semantic Observation.
 * Sie ist ausschließlich ein reproduzierbares Wahrnehmungsexperiment.
 */
export default function DebugVisualEmergence({
  scene,
  count = 25,
}) {
  const samples = useMemo(() => {
    if (!scene || count <= 0) return [];

    scene.updateMatrixWorld(true);

    const candidates = [];
    const sceneWorldInverse = new THREE.Matrix4()
      .copy(scene.matrixWorld)
      .invert();

    scene.traverse((child) => {
      if (!child.isMesh || !child.geometry) return;

      const positionAttribute =
        child.geometry.getAttribute("position");

      if (!positionAttribute) return;

      /*
       * Wandelt die Vertexposition aus dem lokalen Mesh-Raum
       * in den lokalen Raum des Referenzmodells um.
       *
       * Dadurch bleibt das Experiment innerhalb desselben
       * DOVE_SCALE-Gruppenraums wie PerceptionModel.
       */
      const meshToScene = new THREE.Matrix4()
        .multiplyMatrices(
          sceneWorldInverse,
          child.matrixWorld
        );

      const normalMatrix =
        new THREE.Matrix3().getNormalMatrix(meshToScene);

      const normalAttribute =
        child.geometry.getAttribute("normal");

      for (
        let vertexIndex = 0;
        vertexIndex < positionAttribute.count;
        vertexIndex += 1
      ) {
        const position = new THREE.Vector3()
          .fromBufferAttribute(positionAttribute, vertexIndex)
          .applyMatrix4(meshToScene);

        const normal = normalAttribute
          ? new THREE.Vector3()
              .fromBufferAttribute(
                normalAttribute,
                vertexIndex
              )
              .applyMatrix3(normalMatrix)
              .normalize()
          : new THREE.Vector3(0, 0, 1);

        candidates.push({
          position,
          normal,
        });
      }
    });

    if (candidates.length === 0) return [];

    const sampleCount = Math.min(
      Math.max(1, count),
      candidates.length
    );

    const step = candidates.length / sampleCount;

    return Array.from(
      { length: sampleCount },
      (_, sampleIndex) => {
        const candidateIndex = Math.min(
          Math.floor(sampleIndex * step),
          candidates.length - 1
        );

        return candidates[candidateIndex];
      }
    );
  }, [scene, count]);

  if (samples.length === 0) return null;

  return (
    <group renderOrder={1200}>
      {samples.map((sample, index) => (
        <EmergencePaper
          key={`${count}-${index}`}
          position={sample.position}
          normal={sample.normal}
        />
      ))}
    </group>
  );
}

function EmergencePaper({ position, normal }) {
  const quaternion = useMemo(() => {
    const forward = new THREE.Vector3(0, 0, 1);

    return new THREE.Quaternion().setFromUnitVectors(
      forward,
      normal.clone().normalize()
    );
  }, [normal]);

  return (
    <mesh
      position={position}
      quaternion={quaternion}
      renderOrder={1200}
    >
      <planeGeometry
        args={[PAPER_WIDTH, PAPER_HEIGHT]}
      />

      <meshBasicMaterial
        color="#ffffff"
        side={THREE.DoubleSide}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}