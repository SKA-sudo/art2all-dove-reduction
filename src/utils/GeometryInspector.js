export function inspectGeometry(mesh) {
  if (!mesh || !mesh.geometry) {
    console.warn("Kein Mesh vorhanden.");
    return null;
  }

  const geometry = mesh.geometry;

  const positions = geometry.attributes.position;
  const normals = geometry.attributes.normal;
  const index = geometry.index;

  const vertexCount = positions.count;
  const normalCount = normals ? normals.count : 0;
  const faceCount = index ? index.count / 3 : vertexCount / 3;

  geometry.computeBoundingBox();

  const bounds = geometry.boundingBox;
  const { min, max } = bounds;

  console.group("🕊️ Art2all Geometry");
  console.log("Vertices :", vertexCount);
  console.log("Normals  :", normalCount);
  console.log("Faces    :", faceCount);
  console.table({
    minX: min.x,
    maxX: max.x,
    minY: min.y,
    maxY: max.y,
    minZ: min.z,
    maxZ: max.z,
  });
  console.groupEnd();

  return {
    geometry,
    positions,
    normals,
    index,
    vertexCount,
    normalCount,
    faceCount,
    bounds,
  };
}