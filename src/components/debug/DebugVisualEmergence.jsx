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
const SHOW_ORIENTATION_DEBUG = false;
const ORIENTATION_MARKER_LENGTH = 0.2;

const orientationMarkerGeometry =
  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0.01),
    new THREE.Vector3(0, 0, ORIENTATION_MARKER_LENGTH),
  ]);

/**
 * Bereitet die Kandidaten für den ausgewählten
 * Distribution-Modus vor.
 *
 * Wichtig:
 * In diesem ersten Infrastruktur-Schritt liefern
 * alle Modi absichtlich dieselbe Verteilung.
 *
 * Die einzelnen Organisationsregeln werden später
 * nacheinander experimentell implementiert.
 */
function organizeCandidates(candidates, distributionMode) {
  const sortedCandidates = [...candidates].sort(
    (candidateA, candidateB) =>
      candidateB.area - candidateA.area
  );

  switch (distributionMode) {
    case "silhouette":
      return sortedCandidates;

    case "head":
      return sortedCandidates;

    case "wing":
      return sortedCandidates;

    case "body":
      return sortedCandidates;

    case "uniform":
    default:
      return sortedCandidates;
  }
}

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
      distributionMode = "uniform",
      organizationFlow = true,
      organizationOverlap = true,
      organizationAdaptiveSize = false,
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

    const normalMatrix =
      new THREE.Matrix3().setFromMatrix4(
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

    const organizedCandidates = organizeCandidates(
      candidates,
      distributionMode
    );

    const sampleCount = Math.min(
      Math.max(1, count),
      organizedCandidates.length
    );

    const step =
      organizedCandidates.length / sampleCount;

    return Array.from(
      { length: sampleCount },
      (_, sampleIndex) => {
        const candidateIndex = Math.min(
          Math.floor(sampleIndex * step),
          organizedCandidates.length - 1
        );

        return organizedCandidates[candidateIndex];
      }
    );
  }, [scene, count, distributionMode]);

  if (samples.length === 0) return null;

  return (
    <group renderOrder={1200}>
      {samples.map((sample, index) => (
        <EmergencePaper
          key={`${distributionMode}-${count}-${index}`}
          position={sample.position}
          normal={sample.normal}
          organizationFlow={organizationFlow}
          organizationOverlap={organizationOverlap}
          organizationAdaptiveSize={
             organizationAdaptiveSize
          }
          distributionMode={distributionMode}
          sampleIndex={index}
        />
      ))}
    </group>
  );
}

    function EmergencePaper({
      position,
      normal,
      organizationFlow,
      organizationOverlap,
      organizationAdaptiveSize,
      distributionMode,
      sampleIndex,
    }) {
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

    const surfaceNormal =
      normal.clone().normalize();

    /*
     * Flow ON:
     *
     * Eine gemeinsame Referenzrichtung wird auf
     * die lokale Tangentialebene projiziert.
     *
     * Dadurch folgen alle Papiere demselben
     * visuellen Strom, bleiben aber korrekt auf
     * der gekrümmten Oberfläche liegen.
     */
    if (organizationFlow) {
      const referenceDirection =
        new THREE.Vector3(1, 0, 0);

      const tangent = referenceDirection
        .clone()
        .addScaledVector(
          surfaceNormal,
          -referenceDirection.dot(
            surfaceNormal
          )
        );

      /*
       * Falls Referenzrichtung und Normale nahezu
       * parallel sind, verwenden wir eine stabile
       * Ersatzrichtung.
       */
      if (
        tangent.lengthSq() <=
        Number.EPSILON
      ) {
        tangent
          .set(0, 1, 0)
          .addScaledVector(
            surfaceNormal,
            -surfaceNormal.y
          );
      }

      tangent.normalize();

      const bitangent =
        surfaceNormal
          .clone()
          .cross(tangent)
          .normalize();

      const rotationMatrix =
        new THREE.Matrix4().makeBasis(
          tangent,
          bitangent,
          surfaceNormal
        );

      return new THREE.Quaternion()
        .setFromRotationMatrix(
          rotationMatrix
        );
    }

    /*
     * Flow OFF:
     *
     * Das Papier folgt weiterhin der Oberfläche,
     * erhält aber eine deterministisch zufällige
     * Drehung um seine lokale Normale.
     *
     * Deterministisch bedeutet:
     * Beim Umschalten bleiben die Vergleichsdaten
     * reproduzierbar.
     */
    const surfaceQuaternion =
      new THREE.Quaternion()
        .setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          surfaceNormal
        );

    const randomValue =
      Math.sin(
        (sampleIndex + 1) * 12.9898
      ) * 43758.5453;

    const normalizedRandom =
      randomValue - Math.floor(randomValue);

    const randomAngle =
      normalizedRandom * Math.PI * 2;

    const localRotation =
      new THREE.Quaternion()
        .setFromAxisAngle(
          new THREE.Vector3(0, 0, 1),
          randomAngle
        );

    return surfaceQuaternion.multiply(
      localRotation
    );
  }, [
    normal,
    organizationFlow,
    sampleIndex,
  ]);


const overlapScale =
  organizationOverlap ? 3.0 : 1.9;

/*
 * R6.4c – Adaptive Size Distribution PoC
 *
 * Die Größe wird innerhalb derselben Taube
 * positionsabhängig verändert.
 *
 * Noch keine validierte semantische Region.
 * Nur ein sichtbarer Test regionaler Gewichtung.
 */

let semanticScale = 1.0;

if (organizationAdaptiveSize) {
  const x = position.x;
  const y = position.y;
  const z = position.z;

  /*
   * Zentraler Bereich:
   * größere visuelle Masse
   */
  if (
    Math.abs(x) < 0.35 &&
    y < 0.25 &&
    y > -0.45
  ) {
    semanticScale = 1.5;
  }

  /*
   * Vorderer Bereich:
   * kleinere Elemente
   */
  if (z > 0.55) {
    semanticScale = 0.65;
  }

  /*
   * Äußere Bereiche:
   * kleinere Elemente
   */
  if (Math.abs(x) > 0.65) {
    semanticScale = 0.6;
  }

  /*
   * Unterer Bereich:
   * leicht kleinere Elemente
   */
  if (y < -0.55) {
    semanticScale = 0.75;
  }
}

const finalScale =
  overlapScale * semanticScale;

  return (
    <group
      position={position}
      quaternion={quaternion}
      renderOrder={1200}
    >
      <mesh
        geometry={geometry}
        scale={[
          finalScale,
          finalScale,
          finalScale,
        ]}
        renderOrder={1200}
      >
      <meshBasicMaterial
          color="#ff00ff"
          side={THREE.DoubleSide}
          depthTest
          depthWrite
          toneMapped={false}
        />
      </mesh>

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