import { useRef } from 'react'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from 'react-three-fiber'
import { useGLTF } from '@react-three/drei'

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

export default function ITechArt(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/iTechArt.glb') as GLTFResult
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
      group.current.rotation.x = Math.cos(t / 4) / 8
      group.current.rotation.y = Math.sin(t / 4) / 8
      group.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    }
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh material={materials.Red} geometry={nodes.Text009.geometry} />
        <mesh material={materials.Black} geometry={nodes.Text009_1.geometry} />
      </group>
      {/* <mesh
        material={materials.Plane}
        geometry={nodes.Plane.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[3.64, 2.03, 2.03]}
      /> */}
    </group>
  )
}
