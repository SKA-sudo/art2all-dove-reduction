import { useMemo } from "react";
import * as THREE from "three";

/**
 * Art2all Semantic Reference Lines
 * 
 * Renders the primary dove axis as red lines:
 * leftWingTip → bodyCenter → rightWingTip
 */
export default function SpaceGridDebug({ gdl }) {
  const geometry = useMemo(() => {
    if (!gdl || !gdl.axis.points.length) return null;

    const points = gdl.axis.points;
    // Points: [leftWingTip, leftShoulder, bodyCenter, rightShoulder, rightWingTip]
    const leftWingTip = points[0];
    const bodyCenter = points[2];
    const rightWingTip = points[4];

    if (!leftWingTip || !bodyCenter || !rightWingTip) return null;

    // Create line segment positions: tip → center → tip
    const positions = new Float32Array([
      ...leftWingTip,
      ...bodyCenter,
      ...bodyCenter,
      ...rightWingTip,
    ]);

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return geom;
  }, [gdl]);

  if (!geometry) return null;

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#ff0000" linewidth={3} />
    </lineSegments>
  );
}