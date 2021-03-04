/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'

import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Text009: THREE.Mesh
    Text009_1: THREE.Mesh
    Plane: THREE.Mesh
  }
  materials: {
    Red: THREE.MeshStandardMaterial
    Black: THREE.MeshStandardMaterial
    Plane: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/iTechArt.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh material={materials.Red} geometry={nodes.Text009.geometry} />
        <mesh material={materials.Black} geometry={nodes.Text009_1.geometry} />
      </group>
      <mesh
        material={materials.Plane}
        geometry={nodes.Plane.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[3.64, 2.03, 2.03]}
      />
    </group>
  )
}

useGLTF.preload('/iTechArt.glb')