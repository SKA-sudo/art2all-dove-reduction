export default function BodyWingTransitionLayer({ regions }) {
  if (!regions?.length) return null;

  return (
    <group renderOrder={1000}>
      {regions.map((region) => (
        <mesh key={region.id} position={region.position}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshBasicMaterial
            color="orange"
            transparent
            opacity={0.85}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}