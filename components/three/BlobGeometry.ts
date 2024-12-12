import * as THREE from 'three';

export function createBlobGeometry(): THREE.IcosahedronGeometry {
  return new THREE.IcosahedronGeometry(4, 30);
}