import { useMemo } from "react";
import * as THREE from "three";

export default function SpaceGridDebug() {
  const geometry = useMemo(() => {
    const positions = [];

    // Grid parameters
    const xMin = -1.5, xMax = 1.5, xStep = 0.5;
    const yMin = -1.5, yMax = 1.5, yStep = 0.5;
    const zMin = -0.5, zMax = 1.5, zStep = 0.5;

    // X-axis lines (parallel to X, varying Y and Z)
    for (let y = yMin; y <= yMax; y += yStep) {
      for (let z = zMin; z <= zMax; z += zStep) {
        positions.push(xMin, y, z);
        positions.push(xMax, y, z);
      }
    }

    // Y-axis lines (parallel to Y, varying X and Z)
    for (let x = xMin; x <= xMax; x += xStep) {
      for (let z = zMin; z <= zMax; z += zStep) {
        positions.push(x, yMin, z);
        positions.push(x, yMax, z);
      }
    }

    // Z-axis lines (parallel to Z, varying X and Y)
    for (let x = xMin; x <= xMax; x += xStep) {
      for (let y = yMin; y <= yMax; y += yStep) {
        positions.push(x, y, zMin);
        positions.push(x, y, zMax);
      }
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );

    return bufferGeometry;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="cyan" linewidth={2} depthTest={false} />
    </lineSegments>
  );
}
