export default function LandmarkLayer({ landmarks = [] }) {
  return (
    <group renderOrder={1000}>
      {landmarks.map((landmark) => (
        <mesh
          key={landmark.name}
          position={landmark.position}
          renderOrder={1000}
        >
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshBasicMaterial
            color={landmark.color ?? "white"}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}