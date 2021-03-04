import { Grid } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import Code from './Code'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'

const threeImport = `import * as THREE from "three";\n`

export default function ThreeCode({
  oldCode = '',
  newCode = '',
  ...diffViewerProps
}) {
  useEffect(() => {
    window.THREE = THREE
    window['OrbitControls'] = OrbitControls
    window['GLTFLoader'] = GLTFLoader
    window['dat'] = dat
  }, [])

  useEffect(() => {
    document.getElementById('screen').innerHTML = ''
    eval(newCode)
    return () => {
      if (window['gui']) {
        window['gui'].destroy()
        window['gui'] = null
      }
    }
  }, [newCode])

  return (
    <Grid
      container
      alignItems="stretch"
      style={{ width: '100%', height: '100%', backgroundColor: '#2d2d2d' }}
    >
      <Grid style={{ width: '50%', height: '100%', overflow: 'auto' }}>
        <code className="language-js">
          <ReactDiffViewer
            oldValue={threeImport + oldCode}
            newValue={threeImport + newCode}
            splitView={false}
            compareMethod={DiffMethod.LINES}
            extraLinesSurroundingDiff={20}
            useDarkTheme
            renderContent={(str) => <Code>{str}</Code>}
            onLineNumberClick={(id) => {
              console.log(id)
            }}
            {...diffViewerProps}
          />
        </code>
      </Grid>
      <Grid
        id="screen"
        style={{ width: '50%', height: '100%', backgroundColor: 'black' }}
      ></Grid>
    </Grid>
  )
}
