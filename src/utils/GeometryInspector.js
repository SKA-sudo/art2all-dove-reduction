import * as THREE from "three";

export function inspectGeometry(mesh) {
  if (!mesh || !mesh.geometry) {
    console.warn("Kein Mesh vorhanden.");
    return null;
  }

  mesh.updateMatrixWorld(true);

  const geometry = mesh.geometry;

  const positions = geometry.attributes.position;
  const normals = geometry.attributes.normal;
  const index = geometry.index;

  const vertexCount = positions.count;
  const normalCount = normals ? normals.count : 0;
  const faceCount = index ? index.count / 3 : vertexCount / 3;

  geometry.computeBoundingBox();

  const localBounds = geometry.boundingBox;
  const worldBounds = new THREE.Box3().setFromObject(mesh);

  const localSize = localBounds.getSize(new THREE.Vector3());
  const localCenter = localBounds.getCenter(new THREE.Vector3());

  const worldSize = worldBounds.getSize(new THREE.Vector3());
  const worldCenter = worldBounds.getCenter(new THREE.Vector3());

  console.group("🕊️ Art2all Geometry Inspector");

  console.log("Mesh:", mesh.name);
  console.log("Vertices:", vertexCount);
  console.log("Normals:", normalCount);
  console.log("Faces:", faceCount);

  console.log("LOCAL SIZE:", localSize.toArray());
  console.log("LOCAL CENTER:", localCenter.toArray());

  console.log("WORLD SIZE:", worldSize.toArray());
  console.log("WORLD CENTER:", worldCenter.toArray());

  console.log("WORLD SCALE:", mesh.getWorldScale(new THREE.Vector3()).toArray());
  console.log("MATRIX WORLD:", mesh.matrixWorld.elements);

  console.groupEnd();

  return {
    geometry,
    positions,
    normals,
    index,
    vertexCount,
    normalCount,
    faceCount,
    localBounds,
    worldBounds,
    localSize,
    localCenter,
    worldSize,
    worldCenter,
  };
}