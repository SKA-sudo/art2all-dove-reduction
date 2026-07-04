import * as THREE from "three";

export function extractFaces(mesh) {
  if (!mesh || !mesh.geometry) {
    console.warn("Kein Mesh vorhanden.");
    return [];
  }

  const geometry = mesh.geometry;

  const positions = geometry.attributes.position;
  const normals = geometry.attributes.normal;
  const index = geometry.index;

  const faces = [];

  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();

  const center = new THREE.Vector3();
  const normal = new THREE.Vector3();

  const triangle = new THREE.Triangle();

  const faceCount = index
    ? index.count / 3
    : positions.count / 3;

  for (let i = 0; i < faceCount; i++) {

    const ia = index ? index.getX(i * 3) : i * 3;
    const ib = index ? index.getX(i * 3 + 1) : i * 3 + 1;
    const ic = index ? index.getX(i * 3 + 2) : i * 3 + 2;

    a.fromBufferAttribute(positions, ia);
    b.fromBufferAttribute(positions, ib);
    c.fromBufferAttribute(positions, ic);

    a.applyMatrix4(mesh.matrixWorld);
    b.applyMatrix4(mesh.matrixWorld);
    c.applyMatrix4(mesh.matrixWorld);

    center.copy(a).add(b).add(c).multiplyScalar(1 / 3);

    triangle.set(a, b, c);

    triangle.getNormal(normal);

    faces.push({
      faceIndex: i,

      a: a.clone(),
      b: b.clone(),
      c: c.clone(),

      center: center.clone(),
      normal: normal.clone(),
      area: triangle.getArea(),
    });
  }

  console.log("🪶 Faces extrahiert:", faces.length);

  return faces;
}