import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders/blobShaders';

export function createBlobMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0.0 },
      u_intensity: { value: 0.0 }
    },
    vertexShader,
    fragmentShader,
    wireframe: true,
    transparent: true
  });
}