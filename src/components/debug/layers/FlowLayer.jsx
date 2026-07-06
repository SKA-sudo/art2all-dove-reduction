import { useMemo } from "react";
import * as THREE from "three";

export default function FlowLayer({ flow = [] }) {
  const geometry = useMemo(() => {
    const positions = [];

    flow.forEach((item) => {
      positions.push(item.center.x, item.center.y, item.center.z);
      positions.push(item.end.x, item.end.y, item.end.z);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    return geo;
  }, [flow]);

  return (
    <lineSegments geometry={geometry} renderOrder={999}>
      <lineBasicMaterial color="lime" depthTest={false} depthWrite={false} />
    </lineSegments>
  );
}