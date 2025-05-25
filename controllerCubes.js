import * as THREE from 'three';

export function addControllerCube(controller, color = 0x0000ff) {
  const geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
  const material = new THREE.MeshBasicMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0);
  controller.add(cube);
  return cube;
} 