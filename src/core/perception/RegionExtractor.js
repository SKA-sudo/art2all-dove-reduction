import * as THREE from "three";

/**
 * Extracts face centers from the current PerceptionState.
 *
 * Semantic responsibility:
 *
 * WholeDove
 * HAS_FACE_CENTERS
 *
 * This extractor does not detect regions yet.
 * It only samples triangle centers from the observable mesh surface.
 */
export function extractFaceCenters(perceptionState, options = {}) {
  if (!perceptionState) return [];

  const reduction = options.reduction ?? 1;
  const faceCenters = [];

  perceptionState.meshes.forEach((meshState) => {
    const child = meshState.object;

    if (!child?.isMesh || !child.geometry) return;

    const geometry = child.geometry;
    const position = geometry.attributes.position;
    const index = geometry.index;

    if (!position || !index) return;

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


      const edgeAB = vb.clone().sub(va);
      const edgeAC = vc.clone().sub(va);

      const normal = new THREE.Vector3()
        .crossVectors(edgeAB, edgeAC)
        .normalize();

      faceCenters.push({
      id: `face-center-${faceCenters.length}`,
      position: center,
      normal,
    });
    }
  });

  return faceCenters;
}