import * as THREE from "three";

export function extractBodyWingTransition(perceptionState, options = {}) {
  if (!perceptionState) return [];

  const sampleStep = options.sampleStep ?? 1;
  const regions = [];

  perceptionState.meshes.forEach((meshState) => {

  const child = meshState.object;
    if (!child.isMesh || !child.geometry) return;
    
    const geometry = child.geometry;
    const position = geometry.attributes.position;
    const index = geometry.index;

    if (!position || !index) return;

    const reduction = options.reduction ?? 1;
        if (child.isSkinnedMesh) {
      child.skeleton?.update();
    }
    for (let i = 0; i < index.count; i += 3 * reduction) {
      const a = index.getX(i);
      const b = index.getX(i + 1);
      const c = index.getX(i + 2);

      const va = new THREE.Vector3().fromBufferAttribute(position, a);
      const vb = new THREE.Vector3().fromBufferAttribute(position, b);
      const vc = new THREE.Vector3().fromBufferAttribute(position, c);
      if (child.isSkinnedMesh && typeof child.boneTransform === "function") {
        child.boneTransform(a, va);
        child.boneTransform(b, vb);
        child.boneTransform(c, vc);
      }

      const center = new THREE.Vector3()
      .addVectors(va, vb)
      .add(vc)
      .divideScalar(3);

      regions.push({
        id: `face-center-${regions.length}`,
        position: center,
      });
    }
  });

  return regions;
}