// add == to things that work 
//ok let me clean this up for now 
//mandatory start code == (rn I have orbit, first person, and pointer lock controls in here. some of this should probably go )//ok i don't think I like pointer lock 
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { CSS2DRenderer,CSS2DObject } from "three/examples/jsm/Addons.js";
// import { FirstPersonControls } from "three/examples/jsm/Addons.js";
//make a scene ==
const scene = new THREE.Scene();
//add fog ==
scene.fog = new THREE.Fog(0x4f5052, 0.0025, 150); 

//setup a renderer == i think
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xefface);
document.body.appendChild(renderer.domElement);

//setup camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = -3;
camera.position.z = 8;
camera.position.y = 2;



//label renderer video https://www.youtube.com/watch?v=0ZW3xrFhY3w OH MY GOD IT WORKS HA. did up to 4:00 minutes before transformations. 
const labelRenderer= new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top='0px';
labelRenderer.domElement.style.pointerEvents = 'none'; 
document.body.appendChild(labelRenderer.domElement);
//trying text another way https://www.youtube.com/watch?v=LsoidaI-8qQ&t=124s 
const app = document.getElementById('intro');//hmm idk how this works :(  I change the name and it still works fine? ? ? 
  const canvas = document.querySelector('canvas');
const boxPosition = new THREE.Vector3();


//how tf to run if else in 3d space on click to dissolve dialog

//welcome to texture import land! 

//import floor texture == 
const floorLoader = new THREE.TextureLoader(); 
const floorTexture = floorLoader.load ('/realFloor.png') 
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
floorMaterial.map = floorTexture
//bump map for floor ==
const floorBump = new THREE.TextureLoader().load('/trueBump.png')
floorMaterial.bumpMap = floorBump//ok have them walk through the back wall just fully through it into the new world. 

//roof texture ==
const roofTexture = new THREE.TextureLoader().load('/starsky.png')
const roofMaterial = new THREE.MeshPhongMaterial({ color:
0xffffff})
roofMaterial.map = roofTexture
roofTexture.wrapS = THREE.RepeatWrapping; // horizontal wrapping
roofTexture.wrapT = THREE.RepeatWrapping; // vertical wrapping
roofTexture.repeat.set( 2,2); // how many times to repeat
//side wall texture == 
const sideLoader = new THREE.TextureLoader(); 
const sideTexture = sideLoader.load ('/sideWall.png') // make sure this file exists!

const sideMaterial = new THREE.MeshPhongMaterial({ color: 
  0xffffff })
sideMaterial.map = sideTexture
// nasturtium texture == (although I wish it was clear on the edges)

const nasturtiumTexture = new THREE.TextureLoader().load('/nasturtium.png')
const nasturtiumMat = new THREE.MeshPhongMaterial({color:0xffffff})
nasturtiumMat.map = nasturtiumTexture

//back wall with house texture  == 
const backLoader = new THREE.TextureLoader();
const backTexture = backLoader.load('/fairyTexture.png')
const backMaterial = new THREE.MeshPhongMaterial({ color: 
    0xffffff })
backMaterial.map = backTexture

//make a ray
const raycaster = new THREE.Raycaster();

// make a  mouse
const mouse = new THREE.Vector2();
function onMouseMove (event){
  mouse.x= (event.clientX / window.innerWidth)*2-1;
  mouse.y=-(event.clientY / window.innerHeight)*2+1;

}
window.addEventListener("mousemove",onMouseMove,false)

//first person controls OK FIX THIS PART 
// const fpControls = new FirstPersonControls(camera, renderer.domElement);


//add lights
scene.add(new THREE.AmbientLight(0x666666));
const dirLight = new THREE.DirectionalLight(0xaaaaaa);
dirLight.position.set(5, 12, 8);
dirLight.castShadow = true;
dirLight.intensity = 1;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 200;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
dirLight.shadow.mapSize.width = 512;
dirLight.shadow.mapSize.height = 512;
dirLight.shadow.radius = 4;
dirLight.shadow.bias = -0.0005;
scene.add(dirLight);
//add stuff to the scene


//adding nasturtium //next step is do selection on nasturtium, click to disappear ... selection tools //https://threejs.org/examples/webgl_interactive_cubes
const Flowers = new THREE.Group()
nasturtiumMat.side = THREE.DoubleSide
const Nasturtium = new THREE.PlaneGeometry(5, 5);
const nasturtiumMesh = new THREE.Mesh(Nasturtium, nasturtiumMat);
nasturtiumMesh.position.set(35,2,10);
nasturtiumMesh.rotation.set(0,  Math.PI/2,0);
nasturtiumMesh.receiveShadow = true;
Flowers.add(nasturtiumMesh)

//adding things to pick the nasturtium out of 
const protoMat = new THREE.MeshPhongMaterial({color:0xbaff1e });
protoMat.side = THREE.DoubleSide
const protoGeo = new THREE.PlaneGeometry(5, 5);
const protoMesh = new THREE.Mesh(protoGeo, protoMat);
protoMesh.position.set(32,5,13);
protoMesh.rotation.set(0, Math.PI/2, 0);
protoMesh.receiveShadow = true;
Flowers.add(protoMesh)
scene.add(Flowers);
//do raycasting on nasturtium 



//create ground plane
floorMaterial.side = THREE.DoubleSide
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMesh = new THREE.Mesh(groundGeometry, floorMaterial);
groundMesh.position.set(0, -2, 0);
groundMesh.rotation.set(Math.PI / -2, 0, 0);
groundMesh.receiveShadow = true;
scene.add(groundMesh);


//create another side plane
sideMaterial.side = THREE.DoubleSide

const rightGeometry = new THREE.PlaneGeometry(100, 100);
const rightMesh = new THREE.Mesh(rightGeometry, sideMaterial);
rightMesh.position.set(40, 30, 0);
rightMesh.rotation.set(Math.PI / -2, Math.PI / -2, 3*(Math.PI / 2));
rightMesh.receiveShadow = true;
scene.add(rightMesh);

//side walls
//if looking at back wall, x slides to left, y slides up, z slides front and back 
const leftGeometry = new THREE.PlaneGeometry(100,100);
const leftMesh = new THREE.Mesh(leftGeometry,sideMaterial);
leftMesh.position.set(-40,30,0);
leftMesh.rotation.set(Math.PI / -2, Math.PI / -2, 3*(Math.PI / 2));
leftMesh.receiveShadow = true;
scene.add(leftMesh);

//back wall
backMaterial.side = THREE.DoubleSide
const backGeometry = new THREE.PlaneGeometry(100,100);
const backMesh = new THREE.Mesh(backGeometry,backMaterial);
backMesh.position.set(0,30,-50)
backMesh.rotation.set(0,0,0);
backMesh.receiveShadow = true;
scene.add(backMesh);

//roof
roofMaterial.side = THREE.DoubleSide
const roofGeometry = new THREE.PlaneGeometry(200,200);
const roofMesh = new THREE.Mesh(roofGeometry,roofMaterial);
roofMesh.position.set(0,80,-50)
roofMesh.rotation.set(80,0,0);
roofMesh.receiveShadow = true;
scene.add(roofMesh);

// add orbitcontrols
const controller = new OrbitControls(camera, renderer.domElement);
controller.enableDamping = true;
controller.dampingFactor = 0.05;
controller.minDistance = 3;
controller.maxDistance = 100;
controller.minPolarAngle = Math.PI / 4;
controller.maxPolarAngle = (3 * Math.PI) / 4;
/////////trying flashlight

const lightTarget = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshPhongMaterial({color:0xdecade})

);
lightTarget.position.set(0,0,-3);


const spotlight = new THREE.Mesh(
  new THREE.SphereGeometry(1),
  new THREE.MeshPhongMaterial({transparent:true,color:0xffff00, opacity:0.4})
);
spotlight.position.set(0,0,0);

// const controls = new PointerLockControls(camera,document.body); //turn off pointerlock controls :( :( :( go back to first person bu
window.addEventListener('click',function(){controls.lock();});


const cameraPlayer = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshPhongMaterial({color:0x0000ff})
);
cameraPlayer.position.set(0,0,3);
cameraPlayer.add(spotlight);
cameraPlayer.add(lightTarget);
scene.add(cameraPlayer);

const spotLight = new THREE.SpotLight(0xffffff,1.0,10,Math.PI*0.1,0,1);
camera.add(spotLight);
camera.add(spotLight.target)
spotLight.target.position.z = -3
let flashlight = true;
if (flashlight = true);
  spotLight.intensity = 1; 
///////////none of this did what I wanted it to do :( came from here: https://www.youtube.com/watch?v=CQxLslU20UI&ab_channel=flanniganable 

renderer.render(scene, camera);
let lastIntersected = undefined
let lastMaterial = undefined
let step = 0;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse,camera);
  labelRenderer.render(scene,camera);

  const intersects = raycaster.intersectObjects(Flowers.children);
  if (lastMaterial == undefined){ //oh my god it WORKS
    if (intersects.length>=1){ //haha this is a list not a length. cry. 
      lastIntersected = intersects[0].object
      lastMaterial=intersects[0].object.material.clone()
      console.log(lastMaterial)
      
      // lastIntersected.object.material.color.set(0x00ffff);
      intersects[0].object.material.color.set(0xff0000); //can't figure out what else to do here 
    } }
    else {
      if(lastIntersected != undefined){
        console.log(lastMaterial)
        lastIntersected.material.copy(lastMaterial)
        console.log(lastMaterial)
        lastIntersected = undefined
        lastMaterial = undefined
    }
  }


//make a dictionary for the materials 
    
controller.update();
}


animate();



