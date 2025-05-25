import * as THREE from 'three';

export class ControllerCube {
  constructor(controller, size = 0.05) {
    this.controller = controller;
    this.mesh = null;
    this.rayLine = null;
    
    this.init(size);
  }

  init(size) {
    // Create cube geometry and material
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });
    
    // Create cube mesh
    this.mesh = new THREE.Mesh(geometry, material);
    this.controller.add(this.mesh);

    // Create ray line
    this.createRayLine();
  }

  createRayLine() {
    const material = new THREE.LineBasicMaterial({ 
      color: 0x00ff00,
      linewidth: 0.005
    });
    
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    ];
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.rayLine = new THREE.Line(geometry, material);
    this.mesh.add(this.rayLine);
  }

  updateRayLineAppearance({ color, thickness }) {
    if (color !== undefined) {
      this.rayLine.material.color.set(color);
    }
    if (thickness !== undefined) {
      this.rayLine.material.linewidth = thickness;
    }
  }

  resetRayLineAppearance() {
    this.updateRayLineAppearance({
      color: 0x00ff00,
      thickness: 0.005
    });
  }

  getMesh() {
    return this.mesh;
  }

  getRayLine() {
    return this.rayLine;
  }
} 