import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'

export default function CanvasWithTitle({
  children = null,
  title = '',
  clearColor = 'white',
  ...canvasProps
}) {
  return (
    <>
      {title ? (
        <h1 style={{ position: 'absolute', zIndex: 2 }}>{title}</h1>
      ) : null}
      <Canvas {...canvasProps}>{children}</Canvas>
    </>
  )
}
