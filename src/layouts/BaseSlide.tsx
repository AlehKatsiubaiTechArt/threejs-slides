import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'

export default function CanvasWithTitle({ children = null, title = '' }) {
  return (
    <>
      {title ? (
        <h1 style={{ position: 'absolute', zIndex: 2 }}>{title}</h1>
      ) : null}
      <Canvas>
        <ambientLight intensity={0.3} />
        <spotLight
          intensity={1}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 20]}
        />
        {children}
      </Canvas>
    </>
  )
}
