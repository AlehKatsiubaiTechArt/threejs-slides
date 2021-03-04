import { Container, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import Prism from 'prismjs'
import Code from '../components/Code'

import 'prismjs/components/prism-c'
import 'prismjs/components/prism-glsl'

const vertexShader = `
attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;
void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vTextureCoord = aTextureCoord;
  // Apply lighting effect
  highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
  highp vec3 directionalLightColor = vec3(1, 1, 1);
  highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  vLighting = ambientLight + (directionalLightColor * directional);
}`

const vertexShader2 = `
attribute vec3 vertex;
attribute vec3 normal;

uniform mat4 _mvProj;
uniform mat3 _norm;

varying vec3 vColor;
varying vec3 localPos;

#pragma include "light.glsl"

vec3 materialColor = vec3(1.0,0.7,0.8);
vec3 specularColor = vec3(1.0,1.0,1.0);

void main(void) {
	// compute position
	gl_Position = _mvProj * vec4(vertex, 1.0);
	localPos = vertex;
	// compute light info
	vec3 n = normalize(_norm * normal);
	vec3 diffuse;
	float specular;
	float glowingSpecular = 50.0;
	getDirectionalLight(n, _dLight, glowingSpecular, diffuse, specular);
	vColor = max(diffuse,_ambient.xyz)*materialColor+specular*specularColor+_ambient;
}
`

const fragmentShader = `
varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;
uniform sampler2D uSampler;
void main(void) {
  highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
  gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
}`

const fragmentShader2 = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec3 BrickColor, MortarColor;
uniform vec3 BrickSize;
uniform vec3 BrickPct;

varying vec3 vColor;
varying vec3 localPos;

void main() {
	vec3 color;
	vec3 position, useBrick;
	position = localPos / BrickSize.xyz;

	if (fract(position.y * 0.5) > 0.5){
		position.x += 0.5;
		position.z += 0.5;
	}
	position = fract(position);
	useBrick = step(position, BrickPct.xyz);

	color = mix(MortarColor, BrickColor, useBrick.x * useBrick.y * useBrick.z);
	color *= vColor;

	gl_FragColor = vec4(color, 1.0);
}`

export default function Shaders() {
  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0)
  }, [])
  return (
    <div
      style={{ backgroundColor: '#2d2d2d', width: '100vw', height: '100vh' }}
    >
      <Container>
        <h1 style={{ color: '#ccc', padding: '20px' }}>Shaders</h1>
        <Grid container justify="space-around" wrap="nowrap">
          <Grid>
            <h2 style={{ color: '#ccc' }}>Vertex shader</h2>
            <Code code={vertexShader2} language="glsl" />
          </Grid>
          <Grid>
            <h2 style={{ color: '#ccc' }}>Fragment shader</h2>
            <Code code={fragmentShader2} language="glsl" />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
