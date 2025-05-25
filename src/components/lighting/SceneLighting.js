import * as THREE from 'three';

export class SceneLighting {
  constructor(scene) {
    this.scene = scene;
    this.ambientLight = null;
    this.directionalLight = null;
    
    this.init();
  }

  init() {
    // Add ambient light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(this.ambientLight);

    // Add directional light
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    this.directionalLight.position.set(0, 1, 1);
    this.scene.add(this.directionalLight);
  }

  // Method to update ambient light intensity
  setAmbientIntensity(intensity) {
    if (this.ambientLight) {
      this.ambientLight.intensity = intensity;
    }
  }

  // Method to update directional light intensity
  setDirectionalIntensity(intensity) {
    if (this.directionalLight) {
      this.directionalLight.intensity = intensity;
    }
  }

  // Method to update directional light position
  setDirectionalPosition(x, y, z) {
    if (this.directionalLight) {
      this.directionalLight.position.set(x, y, z);
    }
  }
} 