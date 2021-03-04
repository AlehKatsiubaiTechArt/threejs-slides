import React from 'react'
import ThreeCode from '../components/ThreeCode'
import * as codeExample from '../codeExample'

const codeExampleSlides = [
  {
    path: 'Code Example',
    showDiffOnly: false,
  },
  {
    path: 'Code Example: Create Canvas',
    newCode: codeExample.canvasCode,
  },
  {
    path: 'Code Example: Create Renderer',
    newCode: codeExample.canvasCode + codeExample.rendererCode,
  },
  {
    path: 'Code Example: Create Scene',
    newCode:
      codeExample.canvasCode + codeExample.rendererCode + codeExample.sceneCode,
  },
  {
    path: 'Code Example: Create Camera',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode,
  },
  {
    path: 'Code Example: Create Light',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode,
  },
  {
    path: 'Code Example: Create Mesh',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.meshCode,
  },
  {
    path: 'Code Example: Render',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.meshCode +
      codeExample.renderCode,
  },
  {
    path: 'Code Example: Rotate X',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.meshCode +
      codeExample.rotateXCode +
      codeExample.renderCode,
  },
  {
    path: 'Code Example: Rotate Y',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.meshCode +
      codeExample.rotateXCode +
      codeExample.rotateYCode +
      codeExample.renderCode,
  },
  {
    path: 'Code Example: Use setInterval',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.meshCode +
      codeExample.setIntervalCode,
  },
  {
    path: 'Code Example: Use requestAnimationFrame',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.meshCode +
      codeExample.requestAnimationFrameCode,
  },
  {
    path: 'Code Example: Call Animate',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.meshCode +
      codeExample.requestAnimationFrameCode +
      codeExample.animateCode,
  },
  {
    path: 'Code Example: OrbitControls',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.meshCode +
      codeExample.createOrbitControlsCode +
      codeExample.renderWithOrbitControlsCode +
      codeExample.animateCode,
  },
  {
    path: 'Code Example: Load GLTF Models',
    newCode:
      codeExample.canvasCode +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.createOrbitControlsCode +
      codeExample.renderWithOrbitControlsCode +
      codeExample.animateCode +
      codeExample.loadTShirtCode(),
  },
  {
    path: 'Code Example: Create T-Shirt model',
    newCode:
      codeExample.canvasCode +
      codeExample.createTShirt +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.createOrbitControlsCode +
      codeExample.renderWithOrbitControlsCode +
      codeExample.animateCode +
      codeExample.loadTShirtCode(),
  },
  {
    path: 'Code Example: Add GLTF Models on scene',
    newCode:
      codeExample.canvasCode +
      codeExample.createTShirt +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.createOrbitControlsCode +
      codeExample.renderWithOrbitControlsCode +
      codeExample.animateCode +
      codeExample.loadTShirtCode(codeExample.modelLoadedCode),
  },
  {
    path: 'Code Example: Add Texture Loader',
    newCode:
      codeExample.canvasCode +
      codeExample.createFileElement +
      codeExample.createTShirt +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.createOrbitControlsCode +
      codeExample.renderWithOrbitControlsCode +
      codeExample.animateCode +
      codeExample.loadTShirtCode(codeExample.modelLoadedCode),
  },
  {
    path: 'Code Example: Add Dat GUI',
    newCode:
      codeExample.canvasCode +
      codeExample.createFileElement +
      codeExample.createTShirt +
      codeExample.rendererCode +
      codeExample.sceneCode +
      codeExample.cameraCode +
      codeExample.lightCode +
      codeExample.createOrbitControlsCode +
      codeExample.renderWithOrbitControlsCode +
      codeExample.animateCode +
      codeExample.loadTShirtCode(
        codeExample.modelLoadedCode + codeExample.datGUICode
      ),
  },
].map(({ path, newCode, ...props }, i, slides) => ({
  path,
  component: () => (
    <ThreeCode oldCode={slides[i - 1]?.newCode} newCode={newCode} {...props} />
  ),
}))

export default codeExampleSlides
