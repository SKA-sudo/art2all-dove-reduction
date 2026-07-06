import * as THREE from "three";

export function extractBodyWingTransition(scene, options = {}) {
  if (!scene) return [];

  const sampleStep = options.sampleStep ?? 1;
  const regions = [];

  scene.updateMatrixWorld(true);

  scene.traverse((child) => {
    if (!child.isMesh || !child.geometry) return;

    const geometry = child.geometry;
    const position = geometry.attributes.position;
    const index = geometry.index;

    if (!position || !index) return;

    for (let i = 0; i < index.count; i += 3 * sampleStep) {
      const a = index.getX(i);
      const b = index.getX(i + 1);
      const c = index.getX(i + 2);

      const va = new THREE.Vector3().fromBufferAttribute(position, a);
      const vb = new THREE.Vector3().fromBufferAttribute(position, b);
      const vc = new THREE.Vector3().fromBufferAttribute(position, c);

      const center = new THREE.Vector3()
        .addVectors(va, vb)
        .add(vc)
        .divideScalar(3)
        .applyMatrix4(child.matrixWorld);

      regions.push({
        id: `face-center-${regions.length}`,
        position: center,
      });
    }
  });

  return regions;
}