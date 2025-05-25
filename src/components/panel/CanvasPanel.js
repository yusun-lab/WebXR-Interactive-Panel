import * as THREE from 'three';

export class CanvasPanel {
  constructor(scene) {
    this.scene = scene;
    this.mesh = null;
    this.canvas = null;
    this.ctx = null;
    this.texture = null;
    
    this.init();
  }

  init() {
    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.width = 320;
    this.canvas.height = 180;
    this.ctx = this.canvas.getContext('2d');
    
    // Create texture and material
    this.texture = new THREE.CanvasTexture(this.canvas);
    const geometry = new THREE.PlaneGeometry(0.64, 0.36); // 320:180 scaled down for VR
    const material = new THREE.MeshBasicMaterial({ map: this.texture });
    
    // Create mesh
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 1.5, -2); // Position in front of user
    this.scene.add(this.mesh);

    // Initial render
    this.updateContent();
  }

  updateContent(text = 'WebXR Canvas Panel', backgroundColor = '#0000ff', textColor = '#ffff00') {
    // Clear canvas
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw text
    this.ctx.fillStyle = textColor;
    this.ctx.font = '24px sans-serif';
    this.ctx.fillText(text, 20, 90);
    
    // Update texture
    this.texture.needsUpdate = true;
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  getMesh() {
    return this.mesh;
  }

  setColor(color) {
    this.mesh.material.color.set(color);
  }

  resetColor() {
    this.mesh.material.color.set(0xffffff);
  }
} 