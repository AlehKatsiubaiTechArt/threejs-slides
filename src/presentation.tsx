import { ISlide } from './components/Slides'
import React, { Suspense, useEffect, useRef } from 'react'
import CanvasWithTitle from './layouts/CanvasWithTitle'
import {
  Html,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  TransformControls,
  useHelper,
  useTexture,
} from '@react-three/drei'
import Flash from './prefabs/Flash'
import ITechArt from './prefabs/iTechArt'
import U5 from './prefabs/U5'
import {
  CameraHelper,
  Color,
  SpotLightHelper,
  Texture,
  TextureLoader,
} from 'three'
import LightsVisualization from './slides/Light'
import MaterialsVisualization from './slides/Materials'
import WebGLVersions from './prefabs/WebGLVersions'
import WebGL from './prefabs/WebGL'
import CameraSlide from './slides/Camera'
import {
  Avatar,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { useLoader } from 'react-three-fiber'
import WebGLExampleCode from './slides/WebGLExampleCode'
import WebGLExample from './slides/WebGLExample'
import Shaders from './slides/Shaders'
import ThreeCode from './components/ThreeCode'
import * as codeExample from './codeExample'
import codeExampleSlides from './slides/CodeExampleSlides'
import TShirts from './prefabs/T-shirts'

let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT
const frustumSize = 600

export const slides: ISlide[] = [
  {
    path: 'Web in three dimensions',
    component: () => (
      <CanvasWithTitle>
        <Html position={[-5, 3, 0]}>
          <h1 style={{ fontSize: '200px', width: '1200px' }}>
            Web in <span style={{ color: 'red' }}>three</span> dimensions
          </h1>
        </Html>
        <pointLight intensity={1} position={[-10, 10, 15]} />
        <pointLight intensity={1} position={[5, 0, 5]} />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Introduction',
    component: () => (
      <CanvasWithTitle>
        <Html position={[-5, 2, 0]}>
          <Grid container direction="row" wrap="nowrap">
            <Grid item>
              <Avatar
                src="/me.jpg"
                style={{ width: '400px', height: '400px' }}
              />
            </Grid>
            <Grid item>
              <h3 style={{ fontSize: '64px', width: '500px' }}>
                Aleh Katsiuba
              </h3>
              <h3 style={{ width: '500px' }}>Software Engineer</h3>
            </Grid>
          </Grid>
        </Html>
        <Suspense fallback={null}>
          <group position={[2.6, -0.8, 0]}>
            <ITechArt position={[-2, 0, 0]} />
            <U5 position={[1, 0, 0]} />
          </group>
        </Suspense>
        <pointLight intensity={1} position={[-10, 10, 15]} />
        <pointLight intensity={1} position={[5, 0, 5]} />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Adobe flash player',
    component: () => (
      <CanvasWithTitle>
        <Suspense fallback={null}>
          <Flash position={[0, -1, 0]} scale={[2, 2, 2]} />
        </Suspense>
        <ambientLight intensity={0.3} />
        <spotLight
          intensity={1}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 20]}
        />
        <OrbitControls />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'WebGL',
    component: () => (
      <CanvasWithTitle>
        <Suspense fallback={null}>
          <WebGL scale={[2, 2, 2]} />
          {/* <TShirts /> */}
        </Suspense>
        <ambientLight intensity={0.7} />
        <spotLight
          intensity={1}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 20]}
        />
        <OrbitControls />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'WebGL Versions',
    component: () => (
      <CanvasWithTitle>
        <OrthographicCamera
          args={[
            (0.5 * frustumSize * aspect) / -2,
            (0.5 * frustumSize * aspect) / 2,
            frustumSize / 2,
            frustumSize / -2,
            0,
            1000,
          ]}
        />
        <Suspense fallback={null}>
          <WebGLVersions position={[0, 0, 0]} />
        </Suspense>
        <ambientLight intensity={0.7} />
        <OrbitControls />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'CanIUse WebGL',
    component: () => (
      <iframe
        src="https://caniuse.com/?search=webgl"
        style={{
          width: '100%',
          height: '100vh',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        title="r3f basic demo (forked)"
      ></iframe>
    ),
  },
  {
    path: 'WebGL Example',
    component: () => (
      <iframe
        src="https://codesandbox.io/embed/thirsty-snow-ztbk8?fontsize=14&hidenavigation=1&theme=dark&view=preview"
        style={{
          width: '100%',
          height: '100vh',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        title="thirsty-snow-ztbk8"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    ),
  },
  {
    path: 'three.js',
    component: () => (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <img src="https://miro.medium.com/max/724/1*aDcnXab1QC_5KF8JUxDEYA.png" />
      </Grid>
    ),
  },
  {
    path: 'three.js structure',
    component: () => (
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        style={{ height: '100vh' }}
      >
        <img
          style={{ maxWidth: '100vw', maxHeight: '85vh', margin: '30px' }}
          src="/threejs-structure.svg"
        />
      </Grid>
    ),
  },
  {
    path: 'Renderers',
    component: () => (
      <div>
        <h1>Renderers</h1>
        <ul>
          <li>WebGLRenderer</li>
          <li>CSS2DRenderer</li>
          <li>CSS3DRenderer</li>
          <li>SVGRenderer</li>
        </ul>
      </div>
    ),
  },
  {
    path: 'SVGRenderer',
    component: () => (
      <iframe
        src="https://threejs.org/examples/svg_lines.html"
        style={{
          width: '100%',
          height: '100vh',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        title="strange-paper-3q4b2"
      ></iframe>
    ),
  },
  {
    path: 'Scene',
    component: () => (
      <CanvasWithTitle title="Scene">
        <PerspectiveCamera makeDefault position={[2, 2, 2]} />
        <axisHelper />
        <Html position={[1, 0, 0]}>
          <h2 style={{ color: 'red', margin: 0 }}>X</h2>
        </Html>
        <Html position={[0, 1, 0]}>
          <h2 style={{ color: 'green', margin: 0 }}>Y</h2>
        </Html>
        <Html position={[0, 0, 1]}>
          <h2 style={{ color: 'blue', margin: 0 }}>Z</h2>
        </Html>
        <OrbitControls />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Cameras',
    component: () => (
      <div>
        <h1>Cameras</h1>
        <ul>
          <li>PerspectiveCamera</li>
          <li>OrthographicCamera</li>
          <li>CubeCamera</li>
          <li>StereoCamera</li>
        </ul>
      </div>
    ),
  },
  {
    path: 'Perspective camera',
    component: () => (
      <CanvasWithTitle title="Perspective Camera">
        <CameraSlide CameraType={PerspectiveCamera} far={10} />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Orthographic camera',
    component: () => (
      <CanvasWithTitle title="Orthographic Camera">
        <CameraSlide
          CameraType={OrthographicCamera}
          scale={[0.01, 0.01, 0.01]}
          cameraUpdate={(camera) => {
            camera.left = (-0.5 * frustumSize * aspect) / 2
            camera.right = (0.5 * frustumSize * aspect) / 2
            camera.top = frustumSize / 2
            camera.bottom = -frustumSize / 2
          }}
          args={[
            (0.5 * frustumSize * aspect) / -2,
            (0.5 * frustumSize * aspect) / 2,
            frustumSize / 2,
            frustumSize / -2,
            0,
            1000,
          ]}
        />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Lights',
    component: () => (
      <div>
        <h1>Lights</h1>
        <ul>
          <li>AmbientLight</li>
          <li>DirectionalLight</li>
          <li>PointLight</li>
          <li>SpotLight</li>
          <li>RectAreaLight</li>
          <li>HemisphereLight</li>
        </ul>
      </div>
    ),
  },
  {
    path: 'Light',
    component: () => (
      <CanvasWithTitle title="Light">
        <LightsVisualization />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Mesh',
    component: () => (
      <CanvasWithTitle title="Mesh">
        {/* <OrthographicCamera makeDefault args={[1, 1, 1, 0, 1000]} /> */}
        <OrbitControls />
        <mesh>
          <boxBufferGeometry args={[2, 2, 2]} />
          <meshPhysicalMaterial color="orange" />
        </mesh>
        <ambientLight intensity={0.3} />
        <spotLight
          intensity={1}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 20]}
        />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Geometry',
    component: () => (
      <CanvasWithTitle title="Geometry">
        <OrbitControls />
        <mesh>
          <boxBufferGeometry args={[2, 2, 2]} />
        </mesh>
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Geometry wireframe',
    component: () => (
      <CanvasWithTitle title="Geometry wireframe">
        <OrbitControls />
        <mesh>
          <boxBufferGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="green" wireframe />
        </mesh>
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Software',
    component: () => (
      <Container maxWidth="lg">
        <h1>Software</h1>
        <Grid container justify="space-around">
          <Grid>
            <img
              width="500"
              src="https://download.blender.org/branding/blender_logo_socket.png"
            />
          </Grid>
          <Grid>
            <img width="500" src="/3ds-max-logo.png" />
          </Grid>
          <Grid>
            <img width="500" src="/maya-logo.png" />
          </Grid>
        </Grid>
      </Container>
    ),
  },
  {
    path: 'threejs.org/editor',
    component: () => (
      <iframe
        src="https://threejs.org/editor/"
        style={{
          width: '100%',
          height: '100vh',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      ></iframe>
    ),
  },
  {
    path: 'Materials',
    component: () => (
      <CanvasWithTitle title="Materials">
        <MaterialsVisualization />
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Shader',
    component: () => <Shaders />,
  },
  {
    path: 'Texture',
    component: () => (
      <CanvasWithTitle title="Texture">
        <OrbitControls />
        <Suspense fallback={null}>
          <TextureSlide />
        </Suspense>
      </CanvasWithTitle>
    ),
  },
  {
    path: 'Mesh Components',
    component: () => (
      <CanvasWithTitle title="Mesh Components">
        <OrbitControls />
        <Suspense fallback={null}>
          <MeshComponents />
        </Suspense>
      </CanvasWithTitle>
    ),
  },
  ...codeExampleSlides,
  {
    path: 'CodeSandbox Example',
    component: () => (
      <iframe
        src="https://codesandbox.io/embed/strange-paper-3q4b2?fontsize=14&hidenavigation=1&theme=dark"
        style={{
          width: '100%',
          height: '100vh',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        title="strange-paper-3q4b2"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    ),
  },
]

function TextureSlide() {
  const bumpMap = useTexture('https://threejs.org/examples/textures/crate.gif')
  return (
    <mesh>
      <boxBufferGeometry args={[3, 3, 0.01]} />
      <meshBasicMaterial map={bumpMap} />
    </mesh>
  )
}

function MeshComponents() {
  const bumpMap = useTexture('https://threejs.org/examples/textures/crate.gif')
  return (
    <>
      <mesh position={[-5, 0, 0]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshBasicMaterial wireframe color={0x00ff00} />
      </mesh>
      <Html position={[-2.5, 0, 0]}>
        <img
          style={{ transform: 'translate(-55px, -55px)' }}
          width="110px"
          src="https://wiki.thedarkmod.com/images/5/5a/UV_Tut_22.jpg"
          alt="UV"
        />
      </Html>
      <Html position={[0, 0, 0]}>
        <img
          style={{ transform: 'translate(-55px, -55px)' }}
          width="110px"
          src="https://threejs.org/examples/textures/crate.gif"
          alt="texture"
        />
      </Html>
      <mesh position={[2.5, 0, 0]}>
        <sphereBufferGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial map={bumpMap} />
      </mesh>
      <mesh position={[5, 0, 0]}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshBasicMaterial map={bumpMap} />
      </mesh>
    </>
  )
}
