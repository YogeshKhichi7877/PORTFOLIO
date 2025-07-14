import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RGBELoader } from 'RGBELoader';


// Basic responsive Three.js scene with ambient and spot lights, and OrbitControls

// Create scene
const scene = new THREE.Scene();

// Camera setup
const container = document.querySelector('#threejs');
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(-20, 70, 115);

// Renderer setup

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, canvas: canvas , powerPreference: 'high-performance' , precision: 'highp', depth: true , premultipliedAlpha: true });
renderer.setClearColor('black', 0); // transparent background
renderer.shadowMap.enabled = true;
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);



// Add a subtle ambient light for soft fill
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);


// HDRI Environment
const rgbeLoader = new RGBELoader();
rgbeLoader.setPath('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/');
rgbeLoader.load('studio_small_08_1k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;

});


const loader = new GLTFLoader();
loader.load('./low_poly_gaming_setup.glb', function (gltf) {
    gltf.scene.position.y = -1.5;
    scene.add(gltf.scene);
    const model = gltf.scene;
    model.position.y = 14;
    model.position.x = 40;
    model.position.z = 20;
    model.rotation.y = -Math.PI/36;
    scene.add(model);
});


// OrbitControls for interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

controls.enableZoom = true;
controls.enableRotate = true;
controls.enableKeys = true;





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

