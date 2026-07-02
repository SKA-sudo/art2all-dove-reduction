import { useMemo } from 'react'
import * as THREE from 'three'

export default function SpaceGridDebug({ gdl, fallback = null }) {
  const geometry = useMemo(() => {
    if (!gdl || !gdl.axis?.points?.length) return null

    const bodyCenter = gdl.axis.points[2]
    if (!bodyCenter) return null

    const xMin = -1.2
    const xMax = 1.2
    const y = bodyCenter[1]
    const z = bodyCenter[2]

    const positions = new Float32Array([
      xMin, y, z,
      xMax, y, z,
    ])

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    return geom
  }, [gdl])

  if (!geometry) return fallback

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#ff0000" linewidth={2} />
    </lineSegments>
  )
}
