import { useMemo } from "react";
import * as THREE from "three";
import {
  uniformPriority,
  silhouettePriority,
  headPriority,
  wingPriority,
  bodyPriority,
} from "../../core/perception/PriorityModels";

/*
 * R5.3a – Visual Priority Map
 *
 * Erste technische Visualisierung einer Prioritätskarte.
 *
 * Diese Version verwendet bewusst eine einfache vertikale
 * Testgewichtung:
 *
 * oben  -> hohe Priorität
 * unten -> niedrige Priorität
 *
 * Sie stellt noch keine Wahrnehmungshypothese dar.
 * Sie überprüft ausschließlich die technische Darstellung.
 */

const SAMPLE_STEP = 12;
const POINT_SIZE = 0.035;

function getPriorityColor(priority) {
  const color = new THREE.Color();

  /*
   * Priority:
   * 0.00 -> Blau
   * 0.33 -> Gelb
   * 0.66 -> Orange
   * 1.00 -> Rot
   */
  if (priority < 0.33) {
    color.lerpColors(
      new THREE.Color("#004cff"),
      new THREE.Color("#ffe600"),
      priority / 0.33
    );

    return color;
  }

  if (priority < 0.66) {
    color.lerpColors(
      new THREE.Color("#ffe600"),
      new THREE.Color("#ff8800"),
      (priority - 0.33) / 0.33
    );

    return color;
  }

  color.lerpColors(
    new THREE.Color("#ff8800"),
    new THREE.Color("#ff0000"),
    (priority - 0.66) / 0.34
  );

  return color;
}

    export default function VisualPriorityLayer({
    scene,
    distributionMode = "uniform",
    }) {
    const geometry = useMemo(() => {
        if (!scene) return null;

    scene.updateMatrixWorld(true);

    const worldToScene = new THREE.Matrix4()
      .copy(scene.matrixWorld)
      .invert();

    const points = [];

    scene.traverse((child) => {
      if (!child.isMesh || !child.geometry) return;

      const positionAttribute =
        child.geometry.getAttribute("position");

      if (!positionAttribute) return;

      const index = child.geometry.index;
      const indexCount = index
        ? index.count
        : positionAttribute.count;

      const a = new THREE.Vector3();
      const b = new THREE.Vector3();
      const c = new THREE.Vector3();
      const center = new THREE.Vector3();

      for (
        let indexOffset = 0;
        indexOffset + 2 < indexCount;
        indexOffset += SAMPLE_STEP * 3
      ) {
        const ia = index
          ? index.getX(indexOffset)
          : indexOffset;

        const ib = index
          ? index.getX(indexOffset + 1)
          : indexOffset + 1;

        const ic = index
          ? index.getX(indexOffset + 2)
          : indexOffset + 2;

        if (typeof child.getVertexPosition === "function") {
          child.getVertexPosition(ia, a);
          child.getVertexPosition(ib, b);
          child.getVertexPosition(ic, c);
        } else {
          a.fromBufferAttribute(positionAttribute, ia);
          b.fromBufferAttribute(positionAttribute, ib);
          c.fromBufferAttribute(positionAttribute, ic);
        }

        a
          .applyMatrix4(child.matrixWorld)
          .applyMatrix4(worldToScene);

        b
          .applyMatrix4(child.matrixWorld)
          .applyMatrix4(worldToScene);

        c
          .applyMatrix4(child.matrixWorld)
          .applyMatrix4(worldToScene);

        center
          .copy(a)
          .add(b)
          .add(c)
          .multiplyScalar(1 / 3);

        points.push(center.clone());
      }
    });

    if (points.length === 0) return null;

    const bounds = new THREE.Box3().setFromPoints(points);
    const height = Math.max(
      bounds.max.y - bounds.min.y,
      Number.EPSILON
    );

    const positions = [];
    const colors = [];

points.forEach((point) => {
  let priority = 0;

  switch (distributionMode) {
    case "uniform":
      priority = uniformPriority(point, bounds);
      break;

    case "silhouette":
      priority = silhouettePriority(point, bounds);
      break;

    case "head":
      priority = headPriority(point, bounds);
      break;

    case "wing":
      priority = wingPriority(point, bounds);
      break;

    case "body":
      priority = bodyPriority(point, bounds);
      break;

    default:
      priority = uniformPriority(point, bounds);
  }

  const color = getPriorityColor(priority);

  positions.push(point.x, point.y, point.z);
  colors.push(color.r, color.g, color.b);
});


    const priorityGeometry = new THREE.BufferGeometry();

    priorityGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        positions,
        3
      )
    );

    priorityGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(
        colors,
        3
      )
    );

    return priorityGeometry;
  }, [scene, distributionMode]);

  if (!geometry) return null;

  return (
    <points
      geometry={geometry}
      renderOrder={1300}
    >
      <pointsMaterial
        size={POINT_SIZE}
        sizeAttenuation
        vertexColors
        depthTest
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}