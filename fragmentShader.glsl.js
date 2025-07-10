//
// Title: Main Class
// Author: Zehra Betül AK-Tuğba Açık
// ID: 15865064500-25936372052 
// Section: 3
// Project: 9
// Description: main class for the art gallery
//
const shader = `
/**
* Example Fragment Shader
* Sets the color and alpha of the pixel by setting gl_FragColor
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

// A uniform unique to this shader. You can modify it to the using the form
// below the shader preview. Any uniform you add is automatically given a form
uniform vec3 color;

varying vec3 vLocalPosition;
varying vec3 vLocalNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;


void main() {

    // todo #5
    // - make a horiztonal stripe pattern (use NDC)
    vec4 clipPos = projectionMatrix * modelViewMatrix * float4(vLocalPosition, 1.0);
    
    // todo #6
    // - make a vertical stripe pattern
    
    // todo #7
    // - combine stripes
    
    // todo #8
    // - change to bunny, play with color over time
    
    gl_FragColor = vec4(color, 1.0);
    gl_FragColor = vec4(vLocalPosition.xyz, 1.0);
    gl_FragColor = vec4(vLocalNormal.xyz, 1.0);
    gl_FragColor = vec4(vUv, 0.0, 1.0);
   

}
`

export default fragmentShader