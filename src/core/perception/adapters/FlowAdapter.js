import * as THREE from "three";

export function extractFlow(scene, options = {}) {
  const sampleStep = options.sampleStep ?? 100;
  const normalLength = options.normalLength ?? 1.5;

  if (!scene) return [];

  const surfaceNormals = [];

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

      surfaceNormals.push({
        id: `surface-normal-${surfaceNormals.length}`,
        position: center,
        center,
        normal,
        end: center.clone().add(normal.clone().multiplyScalar(normalLength)),
      });
    }
  });

  return surfaceNormals;
}

export default class FlowAdapter {
  extract({ faces = [] }) {
    return faces
      .map((face, index) => {
        if (!face.center || !face.normal) return null;

        return {
          id: `surface-normal-${index}`,
          position: face.center,
          center: face.center,
          normal: face.normal,
          end: face.center.clone().add(face.normal.clone()),
        };
      })
      .filter(Boolean);
  }
}