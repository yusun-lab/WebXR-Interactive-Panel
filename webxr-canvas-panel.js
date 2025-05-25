import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { SceneLighting } from './src/components/lighting/SceneLighting.js';
import { ControllerManager } from './src/components/controllers/ControllerManager.js';

let camera, scene, renderer;
let canvasMesh;
let sceneLighting, controllerManager;

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

  // Initialize components
  sceneLighting = new SceneLighting(scene);
  controllerManager = new ControllerManager(renderer, scene);

  // Setup canvas panel
  setupCanvasPanel();

  // Start render loop
  renderer.setAnimationLoop(render);
}

function setupCanvasPanel() {
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
  canvasMesh.position.set(0, 1.5, -2); // Position in front of user
  scene.add(canvasMesh);
}

function render() {
  if (controllerManager.isRaycastingActive()) {
    controllerManager.updateIntersection(canvasMesh);
  }
  renderer.render(scene, camera);
} 