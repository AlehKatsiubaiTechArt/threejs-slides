import {
  CurveModifierRef,
  Html,
  OrbitControls,
  Sky,
  useHelper,
} from '@react-three/drei'
import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import {
  Vector3,
  CatmullRomCurve3,
  LineLoop,
  BufferGeometry,
  LineBasicMaterial,
  PointLightHelper,
  SpotLightHelper,
} from 'three'

export default function LightsVisualization() {
  const pointLightRef = useRef<THREE.Object3D>(null!)
  const spotLightRef = useRef<THREE.Object3D>(null!)

  const handlePos = React.useMemo(
    () =>
      [
        { x: 10, y: 2, z: -10 },
        { x: 10, y: 5, z: 7 },
        { x: -5, y: 0, z: 5 },
        { x: -10, y: 2, z: -10 },
      ].map((hand) => new Vector3(...Object.values(hand))),
    []
  )

  const curve = React.useMemo(
    () => new CatmullRomCurve3(handlePos, true, 'centripetal'),
    [handlePos]
  )

  const line = React.useMemo(
    () =>
      new LineLoop(
        new BufferGeometry().setFromPoints(curve.getPoints(50)),
        new LineBasicMaterial({ color: 0xffff00 })
      ),
    [curve]
  )

  useFrame((state) => {
    if (pointLightRef.current) {
      const t = state.clock.getElapsedTime() / 10
      const position = curve.getPoint(t)
      pointLightRef.current.position.set(position.x, position.y, position.z)
      pointLightRef.current.lookAt(0, 0, 0)
      state.gl.setClearColor(0x000000)
    }
  })

  useHelper(pointLightRef, PointLightHelper, 10, 'yellow')
  useHelper(spotLightRef, SpotLightHelper, 'white')

  return (
    <>
      <Sky
        distance={3000}
        turbidity={8}
        rayleigh={6}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        inclination={0.49}
        azimuth={0.25}
      />
      <pointLight
        castShadow
        color={0xeeeebb}
        intensity={0.5}
        distance={15}
        ref={pointLightRef}
      >
        <Html>
          <img
            style={{ transform: 'translate(-25px, -25px)' }}
            width="50px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Light_bulb_%28yellow%29_icon.svg/768px-Light_bulb_%28yellow%29_icon.svg.png"
            alt="Light"
          />
        </Html>
        <meshBasicMaterial />
      </pointLight>
      <spotLight
        position={[2, 7, 5]}
        angle={0.5}
        distance={15}
        castShadow
        color={0xeeeebb}
        intensity={1}
        ref={spotLightRef}
      >
        <Html>
          <img
            style={{ transform: 'translate(-25px, -25px)' }}
            width="50px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Light_bulb_%28yellow%29_icon.svg/768px-Light_bulb_%28yellow%29_icon.svg.png"
            alt="Light"
          />
        </Html>
        <meshBasicMaterial />
      </spotLight>
      <fog attach="fog" args={['gray', 0, 400]} />
      <ambientLight intensity={0.01} />
      <directionalLight
        castShadow
        color={0x3b2431}
        position={[0, 5, -10]}
        intensity={0.7}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <primitive object={line} />
      <mesh receiveShadow castShadow position={[-2, 0, 2]}>
        <sphereBufferGeometry args={[1, 32, 32]} />
        <meshStandardMaterial roughness={0.1} color={0xffffff} />
      </mesh>
      <mesh receiveShadow castShadow position={[2, 0, 2]}>
        <boxBufferGeometry args={[2, 2, 2]} />
        <meshStandardMaterial roughness={0.1} color={0xffffff} />
      </mesh>
      <mesh receiveShadow castShadow position={[2, 0, -2]}>
        <coneBufferGeometry args={[2, 5, 32]} />
        <meshStandardMaterial roughness={0.1} color={0xffffff} />
      </mesh>
      <mesh receiveShadow castShadow position={[-2, 0, -2]}>
        <torusKnotBufferGeometry args={[1, 1, 100, 16]} />
        <meshStandardMaterial roughness={0.1} color={0xffffff} />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <boxBufferGeometry args={[200, 0.1, 200]} />
        <meshStandardMaterial roughness={0.2} color={0xffffff} />
      </mesh>
      <OrbitControls />
    </>
  )
}
