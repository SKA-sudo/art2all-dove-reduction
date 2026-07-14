const BODY_REGION_COLOR = "#00ff66";
const FACE_MARKER_SIZE = 0.014;

export default function BodyRegionDebug({
  region,
}) {
  const faces = region?.faces ?? [];

  if (faces.length === 0) {
    return null;
  }

  return (
    <group>
      {faces.map((face, index) => {
        if (!face?.center) {
          return null;
        }

        return (
          <mesh
            key={
              face.id ??
              `body-region-face-${index}`
            }
            position={face.center}
            renderOrder={1700}
          >
            <sphereGeometry
              args={[
                FACE_MARKER_SIZE,
                10,
                10,
              ]}
            />

            <meshBasicMaterial
              color={BODY_REGION_COLOR}
              transparent
              opacity={0.95}
              depthTest={false}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}