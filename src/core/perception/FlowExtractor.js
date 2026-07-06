import * as THREE from "three";

export function extractFlow(scene, options = {}) {
  const sampleStep = options.sampleStep ?? 100;
  const normalLength = options.normalLength ?? 1.5;

  if (!scene) return [];

  const flow = [];

  scene.updateMatrixWorld(true);

  scene.traverse((child) => {
    if (!child.isMesh || !child.geometry?.attributes?.position) return;

    const position = child.geometry.attributes.position;
    const index = child.geometry.index;
    const worldMatrix = child.matrixWorld;
    const normalMatrix = new THREE.Matrix3().getNormalMatrix(worldMatrix);

    const readVertex = (vertexIndex) =>
      new THREE.Vector3()
        .fromBufferAttribute(position, vertexIndex)
        .applyMatrix4(worldMatrix);

    const faceCount = index ? index.count : position.count;

    for (let i = 0; i < faceCount; i += sampleStep * 3) {
      const ia = index ? index.getX(i) : i;
      const ib = index ? index.getX(i + 1) : i + 1;
      const ic = index ? index.getX(i + 2) : i + 2;

      if (ia == null || ib == null || ic == null) continue;

      const a = readVertex(ia);
      const b = readVertex(ib);
      const c = readVertex(ic);

      const center = new THREE.Vector3()
        .add(a)
        .add(b)
        .add(c)
        .divideScalar(3);

      const normal = new THREE.Vector3()
        .subVectors(b, a)
        .cross(new THREE.Vector3().subVectors(c, a))
        .normalize()
        .applyMatrix3(normalMatrix)
        .normalize();

      flow.push({
        center,
        normal,
        end: center.clone().add(normal.clone().multiplyScalar(normalLength)),
      });
    }
  });

  return flow;
}