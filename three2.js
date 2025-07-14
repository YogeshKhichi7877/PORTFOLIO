import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RGBELoader } from 'RGBELoader';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const container = document.querySelector('#dcontainer');
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(11, 3, 0);
camera.lookAt(0, 3, 0);



// Set up the renderer
const canvas = document.querySelector('#canvas2');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas, alpha: true });
renderer.setClearColor('black', 0); // transparent background
renderer.shadowMap.enabled = true;
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Add a subtle ambient light for soft fill
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);



// Add a spot light with shadows enabled
const spotLight = new THREE.SpotLight(0xffffff, 0.5);
spotLight.position.set(10, 20, 10);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.3;
spotLight.decay = 2;
spotLight.distance = 60;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.bias = -0.001;
scene.add(spotLight);



// HDRI Environment
const rgbeLoader = new RGBELoader();
rgbeLoader.setPath('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/');
rgbeLoader.load('venice_sunset_1k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  // scene.background = texture; // keep transparent background
});


// Load the GLB model
const loader = new GLTFLoader();
loader.load(
  './camel.glb',
  function (gltf) {
    const model = gltf.scene; // Move model to the side (z axis)
    model.rotation.y = Math.PI / 2; // Rotate 90 degrees to face sideways
    model.position.y = -8 ;
    model.position.x = -3;
    model.position.z = 2;
    model.scale.set(1.7 , 1.7 ,1.7);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error('An error happened while loading the model:', error);
  }
);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


// Responsive resize
function onResize() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onResize);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
