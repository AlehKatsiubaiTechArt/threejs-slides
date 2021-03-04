import {
  CurveModifierRef,
  Environment,
  Html,
  OrbitControls,
  Sky,
  useHelper,
} from '@react-three/drei'
import React, { Suspense, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import {
  Vector3,
  CatmullRomCurve3,
  LineLoop,
  BufferGeometry,
  LineBasicMaterial,
  PointLightHelper,
  Color,
} from 'three'
import { presetsObj } from '@react-three/drei/helpers/environment-assets'

export default function MaterialsVisualization() {
  const pointLightRef = useRef<THREE.Object3D>(null!)
  const spotLightRef = useRef<THREE.Object3D>(null!)

  const handlePos = React.useMemo(
    () =>
      [
        { x: 5, y: 1, z: -5 },
        { x: 5, y: 3, z: 4 },
        { x: -2, y: 2, z: 2 },
        { x: -5, y: 1, z: -5 },
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
    const t = state.clock.getElapsedTime() / 10
    const position = curve.getPoint(t)
    const position2 = curve.getPoint(t + 0.5)
    pointLightRef.current.position.set(position.x, position.y, position.z)
    pointLightRef.current.lookAt(0, 0, 0)
    spotLightRef.current.position.set(position2.x, position2.y, position2.z)
    spotLightRef.current.lookAt(0, 0, 0)
    state.gl.setClearColor(0x000000)
  })

  console.log(presetsObj.studio)

  return (
    <>
      <Suspense fallback={null}>
        <Environment preset="apartment" background={true} />
      </Suspense>
      <pointLight castShadow color={0xffffff} intensity={1} ref={pointLightRef}>
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
      <spotLight castShadow color={0xffffff} intensity={1} ref={spotLightRef}>
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
      <ambientLight intensity={0.2} />
      <mesh position={[-2, 0, -2]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color={0x00dd00} />
      </mesh>
      <mesh position={[0, 0, -2]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color={0x666666} emissive={new Color(0xff0000)} />
      </mesh>
      <mesh position={[2, 0, -2]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={0xffaa00} wireframe />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhongMaterial
          color={0xdddddd}
          specular={new Color(0x009900)}
          shininess={30}
          flatShading
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshNormalMaterial flatShading />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshDepthMaterial />
      </mesh>
      <mesh position={[-2, 0, 2]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhongMaterial
          color={0x000000}
          specular={new Color(0x666666)}
          emissive={new Color(0xff0000)}
          shininess={10}
          opacity={0.9}
          transparent
        />
      </mesh>
      <mesh receiveShadow castShadow position={[0, 0, 2]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial metalness={0.5} roughness={0.5} color="grey" />
      </mesh>
      <mesh receiveShadow castShadow position={[2, 0, 2]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial metalness={0.7} roughness={0} color="white" />
      </mesh>

      <mesh receiveShadow position={[0, -1, 0]}>
        <boxBufferGeometry args={[20, 0.1, 20]} />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <boxBufferGeometry args={[20, 0.1, 20]} />
        <meshPhysicalMaterial metalness={0.7} roughness={0.2} color="grey" />
      </mesh>
      <OrbitControls />
    </>
  )
}
