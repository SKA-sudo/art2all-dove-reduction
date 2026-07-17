import { useEffect, useMemo } from "react";
import * as THREE from "three";

/**
 * Visualisiert die lokale Dichte einer Semantic Surface.
 *
 * Farbstufen:
 * Blau  = geringe Dichte
 * Grün  = mittlere Dichte
 * Gelb  = hohe Dichte
 * Rot   = sehr hohe Dichte
 *
 * Diese Komponente berechnet keine Surface-Metriken.
 * Sie visualisiert ausschließlich bereits vorhandene Werte.
 */
export default function SemanticSurfaceMetricsDebug({
  semanticSurface,
  pointSize = 0.018,
}) {
  const geometry = useMemo(() => {
    const elements = semanticSurface?.elements ?? [];

    const validElements = elements.filter((element) => {
      return (
        element?.position &&
        Number.isFinite(element?.metrics?.localDensity)
      );
    });

    if (validElements.length === 0) {
      return null;
    }

    const densityValues = validElements.map(
      (element) => element.metrics.localDensity
    );

    const minimumDensity = Math.min(...densityValues);
    const maximumDensity = Math.max(...densityValues);
    const densityRange = maximumDensity - minimumDensity;

    const positions = new Float32Array(validElements.length * 3);
    const colors = new Float32Array(validElements.length * 3);

    validElements.forEach((element, index) => {
      const positionOffset = index * 3;

      positions[positionOffset] = element.position.x;
      positions[positionOffset + 1] = element.position.y;
      positions[positionOffset + 2] = element.position.z;

      const normalizedDensity =
        densityRange > 0
          ? (
              element.metrics.localDensity -
              minimumDensity
            ) / densityRange
          : 0;

      const color = getDensityColor(normalizedDensity);

      colors[positionOffset] = color.r;
      colors[positionOffset + 1] = color.g;
      colors[positionOffset + 2] = color.b;
    });

    const bufferGeometry = new THREE.BufferGeometry();

    bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    bufferGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    bufferGeometry.computeBoundingSphere();

    return bufferGeometry;
  }, [semanticSurface]);

  useEffect(() => {
    return () => {
      geometry?.dispose();
    };
  }, [geometry]);

  if (!geometry) {
    return null;
  }

  return (
    <points
      geometry={geometry}
      renderOrder={1000}
      frustumCulled={false}
    >
      <pointsMaterial
        size={pointSize}
        sizeAttenuation
        vertexColors
        depthTest={false}
        depthWrite={false}
        transparent
        opacity={1}
      />
    </points>
  );
}

/**
 * Wandelt eine normalisierte Dichte zwischen 0 und 1
 * in eine klar unterscheidbare Debug-Farbe um.
 */
function getDensityColor(normalizedDensity) {
  if (normalizedDensity < 0.25) {
    return new THREE.Color("blue");
  }

  if (normalizedDensity < 0.5) {
    return new THREE.Color("lime");
  }

  if (normalizedDensity < 0.75) {
    return new THREE.Color("yellow");
  }

  return new THREE.Color("red");
}