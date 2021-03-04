import React, { Suspense } from 'react'
import { Canvas, useThree, useFrame } from 'react-three-fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  OrthographicCamera,
  useHelper,
  TransformControls,
} from '@react-three/drei'
import ITechArt from '../prefabs/iTechArt'
import { Camera, CameraHelper } from 'three'

/* function CameraVisualization() {
  const cameraRef1 = React.useRef<typeof PerspectiveCamera>()
  const cameraRef2 = React.useRef<typeof PerspectiveCamera>()
  useFrame(({ gl, scene, camera, setDefaultCamera }) => {
    const camera1 = cameraRef1.current
    gl.setScissor(0, 0, window.innerWidth / 2, window.innerHeight)
    gl.setScissorTest(true)
    gl.setClearColor('white')
    // setDefaultCamera(camera1)
    camera1.updateProjectionMatrix()
    gl.render(scene, camera1)

    const camera2 = cameraRef2.current!
    gl.setScissor(
      window.innerWidth / 2,
      0,
      window.innerWidth / 2,
      window.innerHeight
    )
    gl.setScissorTest(true)
    gl.setClearColor('gray')
    setDefaultCamera(camera2)
    ;(camera2 ?? { updateProjectionMatrix: () => {} }).updateProjectionMatrix()
    gl.render(scene, camera2)
    camera2.lookAt()
  })
  return (
    <>
      <PerspectiveCamera
        scale={[0.01, 0.01, 0.01]}
        makeDefault={false}
        position={[0, 5, 10]}
        lookAt={}
        ref={cameraRef1}
      >
        <meshBasicMaterial attach="material" />
      </PerspectiveCamera>
      <PerspectiveCamera
        scale={[0.01, 0.01, 0.01]}
        makeDefault={false}
        position={[0, 0, 10]}
        ref={cameraRef2}
      >
        <meshBasicMaterial attach="material" />
      </PerspectiveCamera>
    </>
  )
} */

export default function App() {
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
      {/* <CameraVisualization /> */}
      <Suspense fallback={null}>
        <TransformControls>
          <ITechArt position={[0, 0, 0]} rotation={[0, 1, 0]} />
        </TransformControls>
      </Suspense>
      <mesh>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" wireframe />
      </mesh>
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
