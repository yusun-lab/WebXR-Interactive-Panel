import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { SceneLighting } from './src/components/lighting/SceneLighting.js';
import { ControllerManager } from './src/components/controllers/ControllerManager.js';
import { CanvasPanel } from './src/components/panel/CanvasPanel.js';

let camera, scene, renderer;
let sceneLighting, controllerManager, canvasPanel;

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
  canvasPanel = new CanvasPanel(scene);

  // Start render loop
  renderer.setAnimationLoop(render);
}

function render() {
  if (controllerManager.isRaycastingActive()) {
    controllerManager.updateIntersection(canvasPanel.getMesh());
  }
  renderer.render(scene, camera);
} 