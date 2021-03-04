import {
  useHelper,
  TransformControls,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import THREE, {
  CameraHelper,
  PerspectiveCamera as PerspectiveCameraThree,
} from 'three'

let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT
const frustumSize = 600

function CameraVisualization({ CameraType, ...cameraProps }) {
  const camera = useRef()
  useHelper(camera, CameraHelper, 1, 'hotpink')
  return (
    <>
      <CameraType
        makeDefault={false}
        scale={[0.002, 0.002, 0.002]}
        position={[0, 0, 2]}
        ref={camera}
        {...cameraProps}
      >
        <meshBasicMaterial />
      </CameraType>
    </>
  )
}

const OrbitTransformControls = React.forwardRef(
  (
    {
      transformControlsRefs,
      ...orbitControlsProps
    }: { transformControlsRefs } & OrbitControls,
    ref: React.MutableRefObject<any>
  ) => {
    /* const ref = React.useRef<OrbitControls>() */

    useEffect(() => {
      transformControlsRefs.forEach((tcr) => {
        if (tcr.current) {
          const { current: controls } = tcr
          const callback = (event) => (ref.current.enabled = !event.value)

          controls.addEventListener('dragging-changed', callback)
          return () =>
            controls.removeEventListener('dragging-changed', callback)
        }
      })
    })
    return <OrbitControls ref={ref} {...orbitControlsProps} />
  }
)

export default function CameraSlide({
  CameraType,
  cameraUpdate = (a) => {},
  ...cameraProps
}) {
  const transformControlsRef = React.useRef<TransformControls>()
  const mainCamera = useRef<THREE.PerspectiveCamera>(null!)
  const secondCamera = useRef<THREE.PerspectiveCamera>(null!)
  const OrbitTransformControlsRef = useRef<OrbitControls>(null!)
  useHelper(secondCamera, CameraHelper, 1, 'hotpink')

  useEffect(() => {
    mainCamera.current.lookAt(0, 0, 0)
    OrbitTransformControlsRef.current.update()
  })

  useFrame((state) => {
    const { scene, gl, setDefaultCamera } = state
    let SCREEN_W, SCREEN_H
    SCREEN_W = window.innerWidth
    SCREEN_H = window.innerHeight

    let left, bottom, width, height

    if (secondCamera.current) {
      left = 0.7 * SCREEN_W + 1
      bottom = 1
      width = 0.3 * SCREEN_W - 2
      height = 0.5 * SCREEN_H - 2
      gl.setViewport(left, bottom, width, height)
      gl.setScissor(left, bottom, width, height)
      gl.setScissorTest(true) // clip out "viewport"
      // setDefaultCamera(secondCamera.current)
      cameraUpdate(secondCamera.current)
      secondCamera.current.aspect = width / height
      secondCamera.current.updateProjectionMatrix()

      OrbitTransformControlsRef.current.update()
      gl.render(scene, secondCamera.current)
    }
  }, 1)

  useFrame((state) => {
    const { scene, gl, setDefaultCamera } = state
    let SCREEN_W, SCREEN_H
    SCREEN_W = window.innerWidth
    SCREEN_H = window.innerHeight

    let left, bottom, width, height

    if (mainCamera.current) {
      left = 0
      bottom = 0
      width = SCREEN_W
      height = SCREEN_H
      gl.setViewport(left, bottom, width, height)
      gl.setScissor(left, bottom, width, height)
      gl.setScissorTest(true)
      // setDefaultCamera(mainCamera.current)
      mainCamera.current.aspect = width / height
      mainCamera.current.updateProjectionMatrix()
      OrbitTransformControlsRef.current.update()
      gl.render(scene, mainCamera.current)
    }
  }, 0)

  return (
    <>
      <PerspectiveCamera position={[-8, 8, 8]} far={10000} ref={mainCamera} />
      <CameraType position={[0, 0, 5]} ref={secondCamera} {...cameraProps}>
        <meshBasicMaterial />
      </CameraType>
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1} position={[10, 15, 20]} />
      <TransformControls args={[mainCamera.current]} ref={transformControlsRef}>
        <mesh scale={[1, 1, 1]} position={[0, 0, 0]}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial color="orange" />
        </mesh>
      </TransformControls>
      <OrbitTransformControls
        ref={OrbitTransformControlsRef}
        args={[mainCamera.current]}
        transformControlsRefs={[transformControlsRef]}
      />
    </>
  )
}
