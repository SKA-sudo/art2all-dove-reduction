import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import SpaceGridDebug from './debug/SpaceGridDebug'

const gdl = {
  axis: {
    points: [
      [-0.8, 0.35, 0],
      [-0.3, 0.5, 0],
      [0, 0.2, 0],
      [0.3, 0.5, 0],
      [0.8, 0.35, 0],
    ],
  },
}

export default function SpatialGridScene() {
  return (
    <Canvas camera={{ position: [0, 4, 3], fov: 20 }}>
      <color attach="background" args={['#202020']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 12, 8]} intensity={1.5} />
      <PerspectiveCamera makeDefault fov={20} position={[0, 4, 3]} />
      <OrbitControls enableDamping dampingFactor={0.08} minDistance={2.2} maxDistance={8} />
      <group>
        <SpaceGridDebug gdl={gdl} />
      </group>
    </Canvas>
  )
}
