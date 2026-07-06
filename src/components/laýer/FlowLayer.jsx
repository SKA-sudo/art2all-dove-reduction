import { useMemo } from "react";
import * as THREE from "three";

export default function FlowLayer({ scene }) {
  const geometry = useMemo(() => {
    if (!scene) return null;

    const positions = [];

    scene.updateMatrixWorld(true);

    scene.traverse((child) => {
      if (!child.isMesh) return;

      const mesh = child;
      const pos = mesh.geometry.attributes.position;
      const index = mesh.geometry.index;

      const normalMatrix = new THREE.Matrix3().getNormalMatrix(
        mesh.matrixWorld
      );

      const worldMatrix = mesh.matrixWorld;

      const sampleStep = 100;

      for (let i = 0; i < index.count; i += sampleStep * 3) {
        const ia = index.getX(i);
        const ib = index.getX(i + 1);
        const ic = index.getX(i + 2);

        const a = new THREE.Vector3().fromBufferAttribute(pos, ia);
        const b = new THREE.Vector3().fromBufferAttribute(pos, ib);
        const c = new THREE.Vector3().fromBufferAttribute(pos, ic);

        a.applyMatrix4(worldMatrix);
        b.applyMatrix4(worldMatrix);
        c.applyMatrix4(worldMatrix);

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

        positions.push(center.x, center.y, center.z);
        positions.push(
          center.x + normal.x * 1.5,
          center.y + normal.y * 1.5,
          center.z + normal.z * 1.5
        );
      }
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    return geo;
  }, [scene]);

  if (!geometry) return null;

  return (
    <lineSegments geometry={geometry} renderOrder={999}>
      <lineBasicMaterial
        color="lime"
        depthTest={false}
        depthWrite={false}
      />
    </lineSegments>
  );
}