import { useMemo } from "react";
import * as THREE from "three";

/**
 * Local Dove Space – X-Achse
 * 
 * Renders the X-axis as a red line in the local dove coordinate system.
 * X-axis extends from -1.2 to +1.2, passing through the body center.
 */
export default function SpaceGridDebug({ gdl }) {
  const geometry = useMemo(() => {
    if (!gdl || !gdl.axis.points.length) return null;

    const bodyCenter = gdl.axis.points[2];
    if (!bodyCenter) return null;

    // X-axis: horizontal line through body center
    const xMin = -1.2;
    const xMax = 1.2;
    const y = bodyCenter[1];
    const z = bodyCenter[2];

    const positions = new Float32Array([
      xMin, y, z,
      xMax, y, z,
    ]);

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return geom;
  }, [gdl]);

  if (!geometry) return null;

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#ff0000" linewidth={2} />
    </lineSegments>
  );
}