export default function DebugBodyCenter({ center }) {
  if (!center) return null;

  return (
    <mesh position={center} renderOrder={1000}>
      <sphereGeometry args={[0.35, 20, 20]} />
      <meshBasicMaterial color="yellow" depthTest={false} />
    </mesh>
  );
}