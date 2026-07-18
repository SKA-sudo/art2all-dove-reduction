import { Color } from "three";

export default function DirectionFieldDebug({
  directionField,
}) {
  if (!Array.isArray(directionField)) return null;

  return (
    <>
      {directionField.map(
        ({ face, normalized }, index) => {
          const color = new Color();

          if (normalized < 0) {
            color.setRGB(
              0,
              1 + normalized,
              -normalized
            );
          } else {
            color.setRGB(
              normalized,
              1 - normalized,
              0
            );
          }

          return (
            <mesh
              key={face?.id ?? index}
              position={face.center}
              renderOrder={1001}
            >
              <sphereGeometry args={[0.08, 6, 6]} />

              <meshBasicMaterial
                color={color}
                depthTest={false}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          );
        }
      )}
    </>
  );
}