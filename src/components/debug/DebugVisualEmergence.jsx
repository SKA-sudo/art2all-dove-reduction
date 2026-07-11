import { useMemo } from "react";
import * as THREE from "three";

import { createRoundedPlane } from "../../utils/RoundedPlaneGeometry";

const PAPER_WIDTH = 0.055;
const PAPER_HEIGHT = 0.035;

/*
 * Temporäre technische Kalibrierung für Sprint R5.2a.
 *
 * Jede cyanfarbene Linie zeigt die lokale +Z-Achse
 * eines Emergence-Papers. Diese Achse entspricht der
 * aktuell verwendeten Oberflächennormale.
 */
const SHOW_ORIENTATION_DEBUG = true;
const ORIENTATION_MARKER_LENGTH = 0.2;

const orientationMarkerGeometry =
  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0.01),
    new THREE.Vector3(0, 0, ORIENTATION_MARKER_LENGTH),
  ]);

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

    /*
     * Die Emergence-Komponente liegt neben dem Referenzmodell
     * im selben übergeordneten Gruppenraum.
     *
     * Deshalb werden die aktuellen World-Space-Positionen
     * anschließend zurück in den lokalen Raum der GLTF-Scene
     * transformiert.
     */
    const worldToScene = new THREE.Matrix4()
      .copy(scene.matrixWorld)
      .invert();

    const normalMatrix = new THREE.Matrix3().setFromMatrix4(
      worldToScene
    );

    scene.traverse((child) => {
      if (!child.isMesh || !child.geometry) return;

      const positions =
        child.geometry.getAttribute("position");

      if (!positions) return;

      const index = child.geometry.index;

      const faceCount = index
        ? index.count / 3
        : positions.count / 3;

      const a = new THREE.Vector3();
      const b = new THREE.Vector3();
      const c = new THREE.Vector3();

      const center = new THREE.Vector3();
      const normal = new THREE.Vector3();

      const edgeAB = new THREE.Vector3();
      const edgeAC = new THREE.Vector3();

      for (
        let faceIndex = 0;
        faceIndex < faceCount;
        faceIndex += 1
      ) {
        const ia = index
          ? index.getX(faceIndex * 3)
          : faceIndex * 3;

        const ib = index
          ? index.getX(faceIndex * 3 + 1)
          : faceIndex * 3 + 1;

        const ic = index
          ? index.getX(faceIndex * 3 + 2)
          : faceIndex * 3 + 2;

        /*
         * getVertexPosition() berücksichtigt bei einem
         * SkinnedMesh die aktuelle Knochenverformung.
         *
         * Ein direktes Lesen aus dem Position-Attribut
         * würde nur die ursprüngliche Bind Pose liefern.
         */
        child.getVertexPosition(ia, a);
        child.getVertexPosition(ib, b);
        child.getVertexPosition(ic, c);

        a.applyMatrix4(child.matrixWorld);
        b.applyMatrix4(child.matrixWorld);
        c.applyMatrix4(child.matrixWorld);

        center
          .copy(a)
          .add(b)
          .add(c)
          .multiplyScalar(1 / 3);

        edgeAB.subVectors(b, a);
        edgeAC.subVectors(c, a);

        normal
          .crossVectors(edgeAB, edgeAC)
          .normalize();
        normal
          .applyMatrix3(normalMatrix)
          .normalize();  

        const area =
          edgeAB
            .clone()
            .cross(edgeAC)
            .length() * 0.5;

        candidates.push({
          position: center
            .clone()
            .applyMatrix4(worldToScene),

          normal: normal.clone(),

          area,
          faceIndex,
        });
      }
    });

    if (candidates.length === 0) return [];

    const sortedCandidates = [...candidates].sort(
      (candidateA, candidateB) =>
        candidateB.area - candidateA.area
    );

    const sampleCount = Math.min(
      Math.max(1, count),
      sortedCandidates.length
    );

    const step =
      sortedCandidates.length / sampleCount;

    return Array.from(
      { length: sampleCount },
      (_, sampleIndex) => {
        const candidateIndex = Math.min(
          Math.floor(sampleIndex * step),
          sortedCandidates.length - 1
        );

        return sortedCandidates[candidateIndex];
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
  const geometry = useMemo(() => {
    return createRoundedPlane(
      PAPER_WIDTH,
      PAPER_HEIGHT,
      0.004,
      4
    );
  }, []);

  const quaternion = useMemo(() => {
    if (!normal) {
      return new THREE.Quaternion();
    }

    const normalizedNormal = normal.clone().normalize();

    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normalizedNormal
    );
  }, [normal]);

  return (
    <group
      position={position}
      quaternion={quaternion}
      renderOrder={1200}
    >
      <mesh
        geometry={geometry}
        scale={[3, 3, 3]}
        renderOrder={1200}
      >
      <meshBasicMaterial
        color="#ff00ff"
        side={THREE.DoubleSide}
        depthTest
        depthWrite
        toneMapped={false}
      /></mesh>
        
        {SHOW_ORIENTATION_DEBUG && (
        <line
          geometry={orientationMarkerGeometry}
          renderOrder={1201}
          dispose={null}
        >
          <lineBasicMaterial
            color="#00ffff"
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </line>
      )}
    </group>
  );
}