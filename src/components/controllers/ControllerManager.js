import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { ControllerCube } from './ControllerCube.js';

export class ControllerManager {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;
    this.controllers = [];
    this.controllerGrips = [];
    this.controllerCubes = [];
    this.raycastingActive = false;
    this.intersected = null;
    
    this.init();
  }

  init() {
    // Setup two controllers (left: 0, right: 1)
    for (let i = 0; i < 2; i++) {
      const controller = this.renderer.xr.getController(i);
      controller.addEventListener('selectstart', (event) => this.onSelectStart(event, i));
      controller.addEventListener('selectend', (event) => this.onSelectEnd(event, i));
      this.scene.add(controller);
      this.controllers.push(controller);

      const controllerModelFactory = new XRControllerModelFactory();
      const controllerGrip = this.renderer.xr.getControllerGrip(i);
      controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
      this.scene.add(controllerGrip);
      this.controllerGrips.push(controllerGrip);

      // Add controller cube with ray line
      const controllerCube = new ControllerCube(controller);
      this.controllerCubes.push(controllerCube);
    }

    // Setup XR session events
    this.renderer.xr.addEventListener('sessionstart', () => {
      this.raycastingActive = true;
    });

    this.renderer.xr.addEventListener('sessionend', () => {
      this.raycastingActive = false;
      this.resetIntersection();
      this.resetRayLines();
    });
  }

  onSelectStart(event, index) {
    // Update ray line appearance for the selected controller
    this.controllerCubes[index].updateRayLineAppearance({
      color: 0xff0000,
      thickness: 0.02
    });

    if (this.intersected) {
      this.intersected.material.color.set(0xff0000); // Highlight on select
    }
  }

  onSelectEnd(event, index) {
    // Reset ray line appearance
    this.controllerCubes[index].resetRayLineAppearance();

    if (this.intersected) {
      this.intersected.material.color.set(0xffffff); // Reset color
    }
  }

  resetRayLines() {
    this.controllerCubes.forEach(cube => cube.resetRayLineAppearance());
  }

  resetIntersection() {
    if (this.intersected) {
      this.intersected.material.color.set(0xffffff);
      this.intersected = null;
    }
  }

  updateIntersection(targetObject) {
    if (!this.raycastingActive) return;

    for (let i = 0; i < this.controllers.length; i++) {
      const raycaster = new THREE.Raycaster();
      const tempMatrix = new THREE.Matrix4();
      tempMatrix.identity().extractRotation(this.controllers[i].matrixWorld);
      raycaster.ray.origin.setFromMatrixPosition(this.controllers[i].matrixWorld);
      raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
      
      const intersects = raycaster.intersectObject(targetObject);
      if (intersects.length > 0) {
        if (this.intersected !== targetObject) {
          if (this.intersected) this.intersected.material.color.set(0xffffff);
          this.intersected = targetObject;
          this.intersected.material.color.set(0x00ff00); // Hover color
        }
      } else {
        if (this.intersected) this.intersected.material.color.set(0xffffff);
        this.intersected = null;
      }
    }
  }

  isRaycastingActive() {
    return this.raycastingActive;
  }
} 