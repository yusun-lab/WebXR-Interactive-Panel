import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { addControllerRayLine, setRayLineAppearance } from './controllerRayLine.js';

let camera, scene, renderer;
let canvasMesh, raycaster, intersected;
let controllers = [], controllerGrips = [], cubes = [], rayLines = [];
let raycastingActive = false;

init();

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(VRButton.createButton(renderer));

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  // 添加平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);

  // Canvas Panel (320x180 px, scaled for VR)
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 320, 180);
  ctx.fillStyle = '#000';
  ctx.font = '24px sans-serif';
  ctx.fillText('WebXR Canvas Panel', 20, 90);

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(0.64, 0.36); // 320:180 scaled down for VR
  const material = new THREE.MeshBasicMaterial({ map: texture });
  canvasMesh = new THREE.Mesh(geometry, material);
  canvasMesh.position.set(0, 1.5, -2); // In front of user
  scene.add(canvasMesh);

  raycaster = new THREE.Raycaster();

  // Setup two controllers (left: 0, right: 1)
  for (let i = 0; i < 2; i++) {
    const controller = renderer.xr.getController(i);
    controller.addEventListener('selectstart', (event) => onSelectStart(event, i));
    controller.addEventListener('selectend', (event) => onSelectEnd(event, i));
    scene.add(controller);
    controllers.push(controller);

    const controllerModelFactory = new XRControllerModelFactory();
    const controllerGrip = renderer.xr.getControllerGrip(i);
    controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
    scene.add(controllerGrip);
    controllerGrips.push(controllerGrip);

    // 直接添加光线到控制器，不添加方块
    const rayLine = addControllerRayLine(controller, 0x00ff00, 0.005, 1);
    rayLines.push(rayLine);
  }

  renderer.xr.addEventListener('sessionstart', () => { raycastingActive = true; });
  renderer.xr.addEventListener('sessionend', () => {
    raycastingActive = false;
    if (intersected) {
      intersected.material.color.set(0xffffff);
      intersected = null;
    }
    // Reset ray lines appearance
    rayLines.forEach((line) => setRayLineAppearance(line, { color: 0xffffff, thickness: 0.005 }));
  });

  renderer.setAnimationLoop(render);
}

function onSelectStart(event, index) {
  setRayLineAppearance(rayLines[index], { color: 0xff0000, thickness: 0.02 });
  if (intersected) {
    intersected.material.color.set(0xff0000); // Highlight on select
  }
}

function onSelectEnd(event, index) {
  setRayLineAppearance(rayLines[index], { color: 0x00ff00, thickness: 0.005 });
  if (intersected) {
    intersected.material.color.set(0xffffff); // Reset color
  }
}

function render() {
  if (raycastingActive) {
    for (let i = 0; i < 2; i++) {
      const tempMatrix = new THREE.Matrix4();
      tempMatrix.identity().extractRotation(controllers[i].matrixWorld);
      raycaster.ray.origin.setFromMatrixPosition(controllers[i].matrixWorld);
      raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
      const intersects = raycaster.intersectObject(canvasMesh);
      if (intersects.length > 0) {
        if (intersected !== canvasMesh) {
          if (intersected) intersected.material.color.set(0xffffff);
          intersected = canvasMesh;
          intersected.material.color.set(0x00ff00); // Hover color
        }
      } else {
        if (intersected) intersected.material.color.set(0xffffff);
        intersected = null;
      }
    }
  }
  renderer.render(scene, camera);
} 