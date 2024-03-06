// add == to things that work 
//next steps; move camera,,,finish text,,,flashlight,,,final door msuhroom thing... 
//mandatory start code == (rn I have orbit, first person, and pointer lock controls in here. some of this should probably go )//ok i don't think I like pointer lock 
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { CSS2DRenderer,CSS2DObject } from "three/examples/jsm/Addons.js";
import { debounce} from 'lodash'
// import { FirstPersonControls } from "three/examples/jsm/Addons.js";
//make a scene ==
const scene = new THREE.Scene();
//add fog ==
scene.fog = new THREE.Fog(0x4f5052, 0.0025, 150); 

//change initial camera location please girl please it's so bad right now

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
camera.position.y = 2; //move this later maybe use first person controls or something idrk 




//label renderer video https://www.youtube.com/watch?v=0ZW3xrFhY3w OH MY GOD IT WORKS HA. did up to 4:00 minutes before transformations. //hm ok i'm not sure which text videos i need...
const labelRenderer= new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top='0px';
labelRenderer.domElement.style.pointerEvents = 'none'; 
document.body.appendChild(labelRenderer.domElement);

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

const nasturtiumTexture = new THREE.TextureLoader().load('/new_nast.png') //maybe go back to ussing nasturtium.png instead, make sure to change in html if I do. 
const nasturtiumMat = new THREE.MeshPhongMaterial({color:0xffffff})
nasturtiumMat.map = nasturtiumTexture

//white decoy flower
const wfTexture = new THREE.TextureLoader().load('/white_flower.png')
const wfMat = new THREE.MeshPhongMaterial({color:0xffffff})
wfMat.map = wfTexture

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


//trying text another way https://www.youtube.com/watch?v=LsoidaI-8qQ&t=124s 


const myFunction = debounce(()=>{var x = document.getElementById("flower-find");  //add some wait time to this debounce still 
if (x.style.display === "none") {
  x.style.display = "block";
} else {
  x.style.display = "none";
}})

const foundNasturtium = debounce(()=>{var x = document.getElementById("found"); 
if (x.style.display === "none") {
  x.style.display = "block";
} else {
  x.style.display = "none";
}})

const foundRing = debounce(()=>{var x = document.getElementById("riddle"); 
if (x.style.display === "none") {
  x.style.display = "block";
} else {
  x.style.display = "none";
}})


 //fix the wait time  ! ! ! longer longer longer
//add lights DO MORE LIGHTS PLEASE SASHA 
scene.add(new THREE.AmbientLight(0xffffff));
const dirLight = new THREE.DirectionalLight(0xaaaaaa); //come back to these colors later! !!
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
const nasturtium = new THREE.Group()
nasturtiumMat.side = THREE.DoubleSide
const Nasturtium = new THREE.PlaneGeometry(5, 5);
const nasturtiumMesh = new THREE.Mesh(Nasturtium, nasturtiumMat);
nasturtiumMesh.position.set(35,2,10);
nasturtiumMesh.rotation.set(0,  Math.PI/2,0);
nasturtiumMesh.receiveShadow = true;
nasturtium.add(nasturtiumMesh)
scene.add(nasturtium)

//adding things to pick the nasturtium out of 
const block1mat = new THREE.MeshPhongMaterial({color:0xbaff1e });
block1mat.side = THREE.DoubleSide
const block1geo = new THREE.PlaneGeometry(5, 5);
const block1mesh = new THREE.Mesh(block1geo, block1mat);
block1mesh.position.set(32,5,13);
block1mesh.rotation.set(0, Math.PI/2, 0);
block1mesh.receiveShadow = true;
Flowers.add(block1mesh)

const block2mat = new THREE.MeshPhongMaterial({color:0xfacade });
wfMat.side = THREE.DoubleSide
const block2geo = new THREE.PlaneGeometry(5, 5);
const block2mesh = new THREE.Mesh(block2geo, wfMat);
block2mesh.position.set(32,3,5); //x is towards viewer, y is up down, z is left right 
block2mesh.rotation.set(0, Math.PI/2, 0);
block2mesh.receiveShadow = true;
Flowers.add(block2mesh)
scene.add(Flowers);

//adding rocks for the salt or something
const Rocks = new THREE.Group()
const rockTexture = new THREE.TextureLoader().load('/rock.png')
const rockMat = new THREE.MeshPhongMaterial({color:0xffffff})
rockMat.map = rockTexture
rockMat.side = THREE.DoubleSide

const rock1geo =  new THREE.PlaneGeometry(5, 5);
const rock1mesh = new THREE.Mesh(rock1geo,rockMat);
rock1mesh.rotation.set(0, Math.PI/2, 0);
rock1mesh.position.set(-31,3,5);
Rocks.add(rock1mesh)

const rock2geo = new THREE.PlaneGeometry (10,10);
const rock2mesh = new THREE.Mesh(rock2geo, rockMat);
rock2mesh.rotation.set(0,Math.PI/2,0);
rock2mesh.position.set(-29,3,-4);
Rocks.add(rock2mesh)

//adding a crystal to pick out of the rocks (not salt, I LIED)
//still need to apply text and transformations with raycasting
const crystalTexture = new THREE.TextureLoader().load('/crystal.png')
const crystalMat = new THREE.MeshPhongMaterial({color:0xffffff})
crystalMat.map = crystalTexture
crystalMat.side = THREE.DoubleSide

const crystalGeo = new THREE.PlaneGeometry(5,5);
const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
crystalMesh.rotation.set(0,Math.PI/2,0);
crystalMesh.position.set(-30,3,2);
scene.add(crystalMesh)



scene.add(Rocks)
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


//add something to the effect of once flower has been collected and crystal has been collected, move on
//first create the fairy ring

const ringTexture = new THREE.TextureLoader().load('/fairy-ring.png')
const ringMat = new THREE.MeshPhongMaterial({color:0xaaaaaa})
ringMat.map = ringTexture
ringMat.side = THREE.DoubleSide

// const ringGeo = new THREE.CylinderGeometry(5,5,20,32);


const ringGeo = new THREE.PlaneGeometry(10,10); 
const ringMesh = new THREE.Mesh(ringGeo,ringMat);
ringMesh.position.set(-10,2,-20)
//scene.add(ringMesh)
 

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
let lastIntersectedFB = undefined
let lastMaterialFB = undefined
let lastIntersectedN = undefined
let lastMaterialN = undefined
let step = 0;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse,camera);
  labelRenderer.render(scene,camera);

  const intersectsFlowerBlocks = raycaster.intersectObjects(Flowers.children);
  //debounce from morgan to stop the flickering
  // tells you instructions for what flower to find when you mouse over the blocks... also add to instructional panel
  if (lastMaterialFB == undefined){ //oh my god it WORKS
    if (intersectsFlowerBlocks.length>=1){ //haha this is a list not a length. cry. 
      lastIntersectedFB = intersectsFlowerBlocks[0].object
      lastMaterialFB=intersectsFlowerBlocks[0].object.material.clone()
      console.log(lastMaterialFB)
      
      // lastIntersected.object.material.color.set(0x00ffff);
      intersectsFlowerBlocks[0].object.material.color.set(0xff0000); 
      myFunction()



    } }
    else {
      if(lastIntersectedFB != undefined){
        console.log(lastMaterialFB)
        lastIntersectedFB.material.copy(lastMaterialFB)
        console.log(lastMaterialFB)
        lastIntersectedFB = undefined
        lastMaterialFB = undefined
        
    }
  }
  const intersectsNasturtium = raycaster.intersectObjects(nasturtium.children);
//this provides "you found it for nasturtium". this should also probably remove the prior textbox, figure out how to code that language in. 
  if (lastMaterialN == undefined){ //oh my god it WORKS
    if (intersectsNasturtium.length>=1){ //haha this is a list not a length. cry. 
      lastIntersectedN = intersectsNasturtium[0].object
      lastMaterialN=intersectsNasturtium[0].object.material.clone()
      console.log(lastMaterialN)
      
      intersectsNasturtium[0].object.material.color.set(0xff0000); 
      foundNasturtium() //still need to fix trailing/elading edge stuff so that it goes away when I need ti to ... hahaha 
  


    } }
    else {
      if(lastIntersectedN != undefined){
        console.log(lastMaterialN)
        lastIntersectedN.material.copy(lastMaterialN)
        console.log(lastMaterialN)
        lastIntersectedN = undefined
        lastMaterialN= undefined
        //scene.add(ringMesh) <-- this is how I want the fairy ring to appear but it should be after the crystals instead of the flowers...like the idea of animating but it seems too much 
        //maybe add a short riddle like a geography question to show where the door opens to...like "a fruit exists: par-is. "
        //I also want to say that if "you found it" is displayed then the next set of flowers shoudl appear....that should go in the function
        //yeah ok so the new order is: a) find nasturtium b) find crystal c) display ring d) ask riddle abt where the ring is going e) something else to end it
    }
  }
//so i can do if color has changed so set a variable to tick up in the first if loop and if that variable is true then show/hide text 

//make a dictionary for the materials 
    
controller.update();
}


animate();



