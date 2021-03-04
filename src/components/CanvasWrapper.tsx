import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  OrthographicCamera,
  useHelper,
} from '@react-three/drei'
import ITechArt from '../prefabs/iTechArt'
import { CameraHelper } from 'three'

export default function CanvasWrapper({ children }) {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <axisHelper />
      <spotLight
        intensity={1}
        angle={0.1}
        penumbra={1}
        position={[20, 20, 20]}
      />
      <Suspense fallback={null}>{children}</Suspense>
      <OrbitControls />
    </Canvas>
  )
}
