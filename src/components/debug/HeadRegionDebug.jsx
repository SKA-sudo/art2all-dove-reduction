const HEAD_REGION_COLOR = "#ff00ff";
const FACE_MARKER_SIZE = 0.035;

export default function HeadRegionDebug({
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
              `head-region-face-${index}`
            }
            position={face.center}
            renderOrder={1600}
          >
            <sphereGeometry
              args={[
                FACE_MARKER_SIZE,
                10,
                10,
              ]}
            />

            <meshBasicMaterial
              color={HEAD_REGION_COLOR}
              transparent
              opacity={0.9}
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