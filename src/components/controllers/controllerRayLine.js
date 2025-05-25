import * as THREE from 'three';

export function addControllerRayLine(parent, color = 0xffffff, thickness = 0.005, length = 1) {
  const material = new THREE.LineBasicMaterial({ color, linewidth: thickness });
  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -length)
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  parent.add(line);
  return line;
}

export function setRayLineAppearance(line, { color, thickness }) {
  if (color !== undefined) line.material.color.set(color);
  if (thickness !== undefined) line.material.linewidth = thickness;
} 