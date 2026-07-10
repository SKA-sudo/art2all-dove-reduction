import { useMemo } from "react";
import * as THREE from "three";

/**
 * First visual organization experiment.
 *
 * Important:
 * These zones are currently derived from the model bounds.
 * They are debug regions, not yet validated Semantic Observations.
 */
export default function DebugOrganizationZones({ scene }) {
  const zones = useMemo(() => {
    if (!scene) return null;

    console.log("DEBUG ORGANIZATION ZONES ACTIVE", scene);

    scene.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(scene);

    console.log(
      "ORGANIZATION BOUNDS",
      bounds.min.toArray(),
      bounds.max.toArray()
    );

    if (bounds.isEmpty()) return null;

    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());

    const wingHeight = size.y * 0.42;
    const wingWidth = size.x * 0.44;
    const bodyWidth = size.x * 0.28;
    const bodyHeight = size.y * 0.58;
    const depth = Math.max(size.z * 1.05, 0.25);

    return {
      wholeDove: {
        position: center.clone(),
        size: size.clone(),
      },

      body: {
        position: new THREE.Vector3(
          center.x,
          center.y - size.y * 0.08,
          center.z
        ),
        size: new THREE.Vector3(bodyWidth, bodyHeight, depth),
      },

      leftWing: {
        position: new THREE.Vector3(
          center.x - size.x * 0.28,
          center.y + size.y * 0.14,
          center.z
        ),
        size: new THREE.Vector3(wingWidth, wingHeight, depth),
      },

      rightWing: {
        position: new THREE.Vector3(
          center.x + size.x * 0.28,
          center.y + size.y * 0.14,
          center.z
        ),
        size: new THREE.Vector3(wingWidth, wingHeight, depth),
      },
    };
  }, [scene]);

  if (!zones) return null;

  return (
    <group renderOrder={1100}>
      <ZoneBox
        position={zones.wholeDove.position}
        size={zones.wholeDove.size}
        color="#ffffff"
        opacity={0.05}
        wireframe
      />

      <ZoneBox
        position={zones.body.position}
        size={zones.body.size}
        color="#3399ff"
        opacity={0.18}
      />

      <ZoneBox
        position={zones.leftWing.position}
        size={zones.leftWing.size}
        color="#44dd88"
        opacity={0.18}
      />

      <ZoneBox
        position={zones.rightWing.position}
        size={zones.rightWing.size}
        color="#44dd88"
        opacity={0.18}
      />
    </group>
  );
}

function ZoneBox({
  position,
  size,
  color,
  opacity,
  wireframe = false,
}) {
  return (
    <mesh
      position={position}
      scale={size}
      renderOrder={1100}
    >
      <boxGeometry args={[1, 1, 1]} />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        wireframe={wireframe}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}