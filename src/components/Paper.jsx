import { Image } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export default function Paper({
  position,
  normal,
  rotation,
  image,
  scale,
}) {
  const quaternion = useMemo(() => {
    // Normale ausrichten
    const align = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal.clone().normalize()
    );

    // Zusätzliche Drehung um die Normale
    const twist = new THREE.Quaternion().setFromAxisAngle(
      normal.clone().normalize(),
      rotation
    );

    // Erst ausrichten, dann drehen
    align.multiply(twist);

    return align;
  }, [normal, rotation]);

  return (
    <group
      position={position}
      quaternion={quaternion}
    >
      <Image
        url={image}
        transparent
        toneMapped={false}
        scale={[scale, scale]}
      />
    </group>
  );
}