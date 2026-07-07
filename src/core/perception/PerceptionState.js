import * as THREE from "three";

export function createPerceptionState(scene, options = {}) {
  if (!scene) {
    return {
      scene: null,
      meshes: [],
      timestamp: 0,
    };
  }

  scene.updateMatrixWorld(true);

  const meshes = [];

  scene.traverse((child) => {
    if (!child.isMesh || !child.geometry) return;

    if (child.isSkinnedMesh) {
      child.skeleton?.update();
    }

    meshes.push({
      object: child,
      geometry: child.geometry,
      matrixWorld: child.matrixWorld.clone(),
      isSkinnedMesh: Boolean(child.isSkinnedMesh),
      skeleton: child.skeleton ?? null,
    });
  });

  return {
    scene,
    meshes,
    timestamp: options.timestamp ?? performance.now(),
  };
}

export function getPerceptionVertex(meshState, vertexIndex, target = new THREE.Vector3()) {
  const position = meshState.geometry.attributes.position;

  target.fromBufferAttribute(position, vertexIndex);

  if (
    meshState.isSkinnedMesh &&
    meshState.object &&
    typeof meshState.object.boneTransform === "function"
  ) {
    meshState.object.boneTransform(vertexIndex, target);
  }

  target.applyMatrix4(meshState.matrixWorld);

  return target;
}