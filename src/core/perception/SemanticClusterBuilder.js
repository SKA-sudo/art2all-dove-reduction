import * as THREE from "three";

/**
 * Gruppiert räumlich zusammenhängende Elemente einer
 * Semantic Surface zu Clustern.
 *
 * Version 2 berücksichtigt:
 *
 * - räumliche Nähe
 * - ähnliche lokale Dichte
 * - transitive Nachbarschaft
 *
 * Der Builder verändert weder die Semantic Surface
 * noch ihre Elemente.
 */
export function buildSemanticClusters(
  semanticSurface,
  {
    maxDistance = 0.01,
    maxDensityDifference = Infinity,
  } = {}
) {
  const elements = semanticSurface?.elements ?? [];

  if (
    elements.length === 0 ||
    !Number.isFinite(maxDistance) ||
    maxDistance <= 0
  ) {
    return [];
  }

  const validElements = elements.filter(
    (element) =>
      element?.position instanceof THREE.Vector3 &&
      Number.isFinite(
        element?.metrics?.localDensity
      )
  );

  if (validElements.length === 0) {
    return [];
  }

  const maxDistanceSquared =
    maxDistance * maxDistance;

  const visitedIndices = new Set();
  const clusters = [];

  for (
    let startIndex = 0;
    startIndex < validElements.length;
    startIndex += 1
  ) {
    if (visitedIndices.has(startIndex)) {
      continue;
    }

    const clusterElementIndices = [];
    const queue = [startIndex];

    visitedIndices.add(startIndex);

    while (queue.length > 0) {
      const currentIndex = queue.shift();
      const currentElement =
        validElements[currentIndex];

      clusterElementIndices.push(currentIndex);

      for (
        let candidateIndex = 0;
        candidateIndex < validElements.length;
        candidateIndex += 1
      ) {
        if (visitedIndices.has(candidateIndex)) {
          continue;
        }

        const candidateElement =
          validElements[candidateIndex];

        const distanceSquared =
          currentElement.position.distanceToSquared(
            candidateElement.position
          );

        if (
          distanceSquared >
          maxDistanceSquared
        ) {
          continue;
        }

        const currentDensity =
          currentElement.metrics.localDensity;

        const candidateDensity =
          candidateElement.metrics.localDensity;

        const densityDifference =
          Math.abs(
            currentDensity -
            candidateDensity
          );

        if (
          densityDifference >
          maxDensityDifference
        ) {
          continue;
        }

        visitedIndices.add(candidateIndex);
        queue.push(candidateIndex);
      }
    }

    const clusterElements =
      clusterElementIndices.map(
        (index) => validElements[index]
      );

    clusters.push(
      createCluster(
        clusterElements,
        clusters.length
      )
    );
  }

  return clusters;
}

/**
 * Erzeugt die zusammengefassten Eigenschaften
 * eines einzelnen Clusters.
 */
function createCluster(elements, clusterIndex) {
  const center = computeClusterCenter(elements);
  const radius = computeClusterRadius(
    elements,
    center
  );

  const densityValues = elements
    .map(
      (element) =>
        element.metrics.localDensity
    )
    .filter(Number.isFinite);

  const averageDensity =
    densityValues.length > 0
      ? densityValues.reduce(
          (sum, density) => sum + density,
          0
        ) / densityValues.length
      : 0;

  return {
    id: `semantic-cluster-${clusterIndex}`,

    elements,

    elementCount: elements.length,

    center,

    radius,

    averageDensity,
  };
}

/**
 * Berechnet den geometrischen Mittelpunkt
 * aller Cluster-Elemente.
 */
function computeClusterCenter(elements) {
  const center = new THREE.Vector3();

  for (const element of elements) {
    center.add(element.position);
  }

  if (elements.length > 0) {
    center.divideScalar(elements.length);
  }

  return center;
}

/**
 * Berechnet den größten Abstand eines Elements
 * zum Cluster-Mittelpunkt.
 */
function computeClusterRadius(
  elements,
  center
) {
  let radius = 0;

  for (const element of elements) {
    const distance =
      element.position.distanceTo(center);

    if (distance > radius) {
      radius = distance;
    }
  }

  return radius;
}