
//
// Title: Main Class
// Author: Zehra Betül AK-Tuğba Açık
// ID: 15865064500-25936372052 
// Section: 3
// Project: 9
// Description: main class for the art gallery
//
const vetrexshader = `
/**
* Example Vertex Shader
* Sets the position of the vertex by setting gl_Position
*/

// Set the precision for data types used in this shader
precision highp float;
precision highp int;

// Default THREE.js uniforms available to both fragment and vertex shader
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

// Default uniforms provided by ShaderFrog.
uniform vec3 cameraPosition;
uniform float time;

// Default attributes provided by THREE.js. Attributes are only available in the
// vertex shader. You can pass them to the fragment shader using varyings
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec2 uv2;

varying vec3 vLocalPosition;
varying vec3 vLocalNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;


void main() {

    // todo #2
    // - pass position, normal, and uv to frag shader and visualize
    vLocalPosition = position;
    vLocalNormal = normal;
    vUv = uv;
 
    
    // todo #3 
    // - pass world pos to frag shader and compute/use lambert term
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
   
    
    // todo #4
    // - oscillate scale in the normal direction
    float normalScale = (sin(time * 10.0) * 0.5 + 0.5) * 0.2;
    vec3 offset = normal * normalScale;
    

    // todo #1
    // - transform vertex pos from local space to clip space
    vec4 clipPos = projectionMatrix * viewMatrix * modelMatrix * vec4(position + offset, 1.0);
    gl_Position = clipPos;
}
`