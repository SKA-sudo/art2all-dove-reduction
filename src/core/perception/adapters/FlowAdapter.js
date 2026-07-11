import * as THREE from "three";

export function extractFlow(scene, options = {}) {
  const sampleStep = options.sampleStep ?? 100;
  const normalLength = options.normalLength ?? 1.5;

  if (!scene) return [];

  const surfaceNormals = [];

  scene.updateMatrixWorld(true);

  /*
   * FlowLayer wird im selben übergeordneten Gruppenraum
   * wie die GLTF-Scene gerendert.
   *
   * Deshalb müssen alle Positionen und Richtungen
   * im lokalen Raum der GLTF-Scene zurückgegeben werden.
   */
  const worldToScene = new THREE.Matrix4()
    .copy(scene.matrixWorld)
    .invert();

  scene.traverse((child) => {
    if (!child.isMesh || !child.geometry?.attributes?.position) {
      return;
    }

    const position = child.geometry.attributes.position;
    const index = child.geometry.index;

    const readVertex = (vertexIndex) => {
      const vertex = new THREE.Vector3();

      /*
       * Berücksichtigt bei SkinnedMesh die aktuelle Verformung.
       */
      if (typeof child.getVertexPosition === "function") {
        child.getVertexPosition(vertexIndex, vertex);
      } else {
        vertex.fromBufferAttribute(position, vertexIndex);
      }

      /*
       * Mesh Local Space
       * → World Space
       * → Scene Local Space
       */
      return vertex
        .applyMatrix4(child.matrixWorld)
        .applyMatrix4(worldToScene);
    };

    const indexCount = index ? index.count : position.count;

    for (
      let i = 0;
      i + 2 < indexCount;
      i += sampleStep * 3
    ) {
      const ia = index ? index.getX(i) : i;
      const ib = index ? index.getX(i + 1) : i + 1;
      const ic = index ? index.getX(i + 2) : i + 2;

      const a = readVertex(ia);
      const b = readVertex(ib);
      const c = readVertex(ic);

      const center = new THREE.Vector3()
        .copy(a)
        .add(b)
        .add(c)
        .divideScalar(3);

      /*
       * Die Normale wird direkt aus Punkten berechnet,
       * die bereits im Scene Local Space liegen.
       *
       * Deshalb darf anschließend keine weitere
       * Normalenmatrix angewendet werden.
       */
      const edgeAB = new THREE.Vector3().subVectors(b, a);
      const edgeAC = new THREE.Vector3().subVectors(c, a);

      const normal = new THREE.Vector3()
        .crossVectors(edgeAB, edgeAC)
        .normalize();

      surfaceNormals.push({
        id: `surface-normal-${surfaceNormals.length}`,
        position: center,
        center,
        normal,
        end: center
          .clone()
          .add(
            normal
              .clone()
              .multiplyScalar(normalLength)
          ),
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