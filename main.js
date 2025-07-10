
// Author: Tuğba AÇIK - Zehra Betül AK

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const skyboxMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('humble_lf.jpg'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('humble_rt.jpg'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('humble_up.jpg'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('humble_dn.jpg'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('humble_ft.jpg'), side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('humble_bk.jpg'), side: THREE.BackSide }),
];

const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterials);
scene.add(skybox);

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube1 = new THREE.Mesh(geometry1, material1);
scene.add(cube1);

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube2 = new THREE.Mesh(geometry2, material2);
scene.add(cube2);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    roughness: 0.2,
    metalness: 0.9,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(5, 12, 4);
scene.add(sphere);



const objLoader = new OBJLoader();
const modelUrl = 'Lowpoly_tree_sample.obj';
objLoader.load(modelUrl, (obj) => {
    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

    obj.scale.set(0.5, 0.5, 0.5);
    obj.position.set(-12, 0, -5);
    scene.add(obj);
});


const planeGeometry = new THREE.PlaneGeometry(10000, 10000, 50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('Grass001_1K-JPG_Color.jpg'),
    aoMap: new THREE.TextureLoader().load('Grass001_1K-JPG_AmbientOcclusion.jpg'),
    displacementMap: new THREE.TextureLoader().load('Grass001_1K-JPG_Displacement.jpg'),
    roughnessMap: new THREE.TextureLoader().load('Grass001_1K-JPG_Roughness.jpg'),
    side: THREE.DoubleSide,
});

planeMaterial.map.wrapS = THREE.RepeatWrapping;
planeMaterial.map.wrapT = THREE.RepeatWrapping;

const debugMaterial = new THREE.MeshBasicMaterial({ map: planeMaterial.displacementMap });
const debugPlane = new THREE.Mesh(planeGeometry, debugMaterial);
debugPlane.rotation.x = Math.PI / 2;
scene.add(debugPlane);

planeMaterial.map.repeat.set(50, 50);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
scene.add(plane);




const middleCubes = [];
const middleCubesCount = 8;
const cubeOffsetY = 1;
const cubeScale = 3; 


const middleCubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); 

for (let i = 0; i < middleCubesCount; i++) {
    const middleCube = new THREE.Mesh(geometry1, middleCubeMaterial.clone()); 
    middleCube.scale.set(cubeScale, cubeScale, cubeScale);
    middleCube.position.set(i * 3.5 - (middleCubesCount - 1), cubeOffsetY, -6);
    scene.add(middleCube);
    middleCubes.push(middleCube);
}


const orthogonalCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const orthogonalCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); 
const orthogonalCube = new THREE.Mesh(orthogonalCubeGeometry, orthogonalCubeMaterial);
orthogonalCube.scale.set(cubeScale, cubeScale, cubeScale); 
orthogonalCube.position.set(0, cubeOffsetY, 15); 
scene.add(orthogonalCube);


const orthogonalCubeGeometry2 = new THREE.BoxGeometry(1, 1, 1);
const orthogonalCubeMaterial2 = new THREE.MeshBasicMaterial({ color: 0x0000ff }); 
const orthogonalCube2 = new THREE.Mesh(orthogonalCubeGeometry2, orthogonalCubeMaterial2);
orthogonalCube2.scale.set(cubeScale, cubeScale, cubeScale); 
orthogonalCube2.position.set(-5, cubeOffsetY, 15); 
scene.add(orthogonalCube2);


const orthogonalCubeGeometry3 = new THREE.BoxGeometry(1, 1, 1);
const orthogonalCubeMaterial3 = new THREE.MeshBasicMaterial({ color: 0x0000ff }); 
const orthogonalCube3 = new THREE.Mesh(orthogonalCubeGeometry3, orthogonalCubeMaterial3);
orthogonalCube3.scale.set(cubeScale, cubeScale, cubeScale); 
orthogonalCube3.position.set(5, cubeOffsetY, 15); 
scene.add(orthogonalCube3);


const orthogonalCubeGeometry4 = new THREE.BoxGeometry(1, 1, 1);
const orthogonalCubeMaterial4 = new THREE.MeshBasicMaterial({ color: 0x0000ff }); 
const orthogonalCube4 = new THREE.Mesh(orthogonalCubeGeometry4, orthogonalCubeMaterial4);
orthogonalCube4.scale.set(cubeScale, cubeScale, cubeScale); 
orthogonalCube4.position.set(10, cubeOffsetY, 15); 
scene.add(orthogonalCube4);



const orthogonalCubeGeometry5 = new THREE.BoxGeometry(1, 1, 1);
const orthogonalCubeMaterial5 = new THREE.MeshBasicMaterial({ color: 0x0000ff }); 
const orthogonalCube5 = new THREE.Mesh(orthogonalCubeGeometry5, orthogonalCubeMaterial5);
orthogonalCube5.scale.set(cubeScale, cubeScale, cubeScale); 
orthogonalCube5.position.set(15, cubeOffsetY, 15); 
scene.add(orthogonalCube5);



function animateOrthogonalCubes() {
    const time = performance.now() * 0.001;
    const colorValue = Math.sin(time) * 0.5 + 0.5; 
    const color = new THREE.Color().setHSL(colorValue, 1, 0.5);

    orthogonalCube.material.color.copy(color);
    orthogonalCube2.material.color.copy(color);
    orthogonalCube3.material.color.copy(color);
    orthogonalCube4.material.color.copy(color);
    orthogonalCube5.material.color.copy(color);
   

    requestAnimationFrame(animateOrthogonalCubes);
}

animateOrthogonalCubes();


const objLoader2 = new OBJLoader();
const modelUrl2 = 'Lowpoly_tree_sample.obj';
objLoader2.load(modelUrl, (obj) => {
    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

    obj.scale.set(0.5, 0.5, 0.5);
    obj.position.set(-12, 0, 15);
    scene.add(obj);
    obj.rotation.set(0, (Math.PI)/2, 0);
});


const additionalObjectLoader2 = new OBJLoader();
const additionalObjectUrl2 = 'Table And Chairs.obj'; 

additionalObjectLoader2.load(additionalObjectUrl2, (obj) => {
   
    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000, 
        roughness: 0.5,
        metalness: 1,
    });

    
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

    
    const additionalObjectScale2 = 0.08; 
    obj.scale.set(additionalObjectScale2, additionalObjectScale2, additionalObjectScale2);

   
    obj.position.set(30, 0, -6); 

   
    obj.rotation.set(0, (Math.PI) / 2, 0); 

    
    scene.add(obj);
});



const additionalObjectLoader3 = new OBJLoader();
const additionalObjectUrl3 = '3dpea.obj'; 
additionalObjectLoader3.load(additionalObjectUrl3, (obj) => {
   
    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0xffdab9, 
        roughness: 0.5,
        metalness: 0.5,
    });

    
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

    
    const additionalObjectScale3 = 0.005; 
    obj.scale.set(additionalObjectScale3, additionalObjectScale3, additionalObjectScale3);

    
    obj.position.set(5, 4, 15); 

   
    obj.rotation.set(0, (Math.PI) / 2, 0);

  
    scene.add(obj);
});


const additionalObjectLoader4 = new OBJLoader();
const additionalObjectUrl4 = '3dpea2.obj'; 
additionalObjectLoader4.load(additionalObjectUrl4, (obj) => {
  
    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcbdb, 
        roughness: 0.5,
        metalness: 0.7,
    });

   
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

  
    const additionalObjectScale4 = 0.005; 
    obj.scale.set(additionalObjectScale4, additionalObjectScale4, additionalObjectScale4);


    obj.position.set(10, 4, 15); 

    obj.rotation.set(0, (Math.PI) / 2, 0); 

    scene.add(obj);
});


const additionalObjectLoader5 = new OBJLoader();
const additionalObjectUrl5 = '3dpea (1).obj'; 
additionalObjectLoader5.load(additionalObjectUrl5, (obj) => {
   
    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcbdb, 
        roughness: 0.5,
        metalness: 0.7,
    });

    
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

    const additionalObjectScale5 = 0.005;
    obj.scale.set(additionalObjectScale5, additionalObjectScale5, additionalObjectScale5);

    obj.position.set(0, 4, 15); 

    obj.rotation.set(0, (Math.PI) / 2, 0); 

    scene.add(obj);
});


const additionalObjectLoader6 = new OBJLoader();
const additionalObjectUrl6 = '3dpea (2).obj'; 
additionalObjectLoader6.load(additionalObjectUrl6, (obj) => {

    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcbdb, 
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

    const additionalObjectScale6 = 0.005; 
    obj.scale.set(additionalObjectScale6, additionalObjectScale6, additionalObjectScale6);

    obj.position.set(15, 4, 15); 

    obj.rotation.set(0, (Math.PI) / 2, 0); 

    scene.add(obj);
});

const additionalObjectLoader7 = new OBJLoader();
const additionalObjectUrl7 = '3dpea (3).obj'; 
additionalObjectLoader7.load(additionalObjectUrl7, (obj) => {

    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcbdb,
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

    const additionalObjectScale7 = 0.005; 
    obj.scale.set(additionalObjectScale7, additionalObjectScale7, additionalObjectScale7);

    obj.position.set(-5, 4, 15); 

    obj.rotation.set(0, (Math.PI) / 2, 0); 

    scene.add(obj);
});

const additionalObjectLoader8 = new OBJLoader();
const additionalObjectUrl8 = '091_W_Aya_30K.obj'; 
additionalObjectLoader8.load(additionalObjectUrl8, (obj) => {
 
    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcc99, 
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

    
    const additionalObjectScale8 = 0.004; 
    obj.scale.set(additionalObjectScale8, additionalObjectScale8, additionalObjectScale8);

    obj.position.set(26, 1, -5); 

    obj.rotation.set(0, (Math.PI) / 2, 0); 

    scene.add(obj);
});

const ringGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
const movingRing = new THREE.Mesh(ringGeometry, ringMaterial);
scene.add(movingRing);

movingRing.position.set(5, 5, 5);
function animateMovingRing() {
    const time = performance.now() * 0.001;

    const radius = 3;
    const speed = 1.5;
    const angle = time * speed;
    const x = Math.cos(angle) * radius + 5; 
    const z = Math.sin(angle) * radius + 5; 
    movingRing.position.set(x, 11, z);

    requestAnimationFrame(animateMovingRing);
}

animateMovingRing();



const additionalObjectLoader = new OBJLoader();
const additionalObjectUrl = 'termos.obj'; 
additionalObjectLoader.load(additionalObjectUrl, (obj) => {
    const coloredMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000, 
        roughness: 0.5,
        metalness: 1,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial;
        }
    });

    const additionalObjectScale = 0.015; 
    obj.scale.set(additionalObjectScale, additionalObjectScale, additionalObjectScale);
    obj.position.set(0, 2.5, -6); 
    obj.rotation.set(0, (Math.PI)/2, 0);
    scene.add(obj);
});

const additionalObject2Loader = new OBJLoader();
const additionalObject2Url = 'mug.obj'; 
additionalObject2Loader.load(additionalObject2Url, (obj) => {
    const coloredMaterial2 = new THREE.MeshStandardMaterial({
        color: 0xff00ff, 
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial2;
        }
    });

    const additionalObject2Scale = 0.015; 
    obj.scale.set(additionalObject2Scale, additionalObject2Scale, additionalObject2Scale);
    
    obj.position.set(3.5, 3, -6);
    obj.rotation.set(0, (Math.PI)/2, 0);

    scene.add(obj);
});

const additionalObject3Loader = new OBJLoader();
const additionalObject3Url = 'nescafe_mug.obj'; 
additionalObject3Loader.load(additionalObject3Url, (obj) => {
    const coloredMaterial3 = new THREE.MeshStandardMaterial({
        color: 0x0000ff, 
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial3;
        }
    });

    const additionalObject3Scale = 12;
    obj.scale.set(additionalObject3Scale, additionalObject3Scale, additionalObject3Scale);

    obj.position.set(-3.5, 2.5, -6);
    obj.rotation.set(0, (Math.PI)/2, 0);

    scene.add(obj);
});

const additionalObject4Loader = new OBJLoader();
const additionalObject4Url = 'tea_cup_High_poly.obj'; 
additionalObject4Loader.load(additionalObject4Url, (obj) => {
    const coloredMaterial4 = new THREE.MeshStandardMaterial({
        color: 0xfde910, 
        roughness: 0.1,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial4;
        }
    });

    const additionalObject4Scale = 0.15; 
    obj.scale.set(additionalObject4Scale, additionalObject4Scale, additionalObject4Scale);

    obj.position.set(7, 2.5, -6);

    scene.add(obj);
});

const additionalObject5Loader = new OBJLoader();
const additionalObject5Url = 'Glass.obj';
additionalObject5Loader.load(additionalObject5Url, (obj) => {
    const coloredMaterial5 = new THREE.MeshStandardMaterial({
        color: 0x964B00,
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial5;
        }
    });

    const additionalObject5Scale = 0.008; 
    obj.scale.set(additionalObject5Scale, additionalObject5Scale, additionalObject5Scale);

    obj.position.set(10.5, 2.5, -6);

    scene.add(obj);
});

const additionalObject6Loader = new OBJLoader();
const additionalObject6Url = 'coffee cup.obj'; 
additionalObject6Loader.load(additionalObject6Url, (obj) => {
    const coloredMaterial6 = new THREE.MeshStandardMaterial({
        color: 0xf28500, 
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial6;
        }
    });

    const additionalObject6Scale = 0.15; 
    obj.scale.set(additionalObject6Scale, additionalObject6Scale, additionalObject6Scale);

    obj.position.set(14, 2.5, -6);

    scene.add(obj);
});

const additionalObject7Loader = new OBJLoader();
const additionalObject7Url = 'TazaQuintero.obj'; 
additionalObject7Loader.load(additionalObject7Url, (obj) => {
    const coloredMaterial7 = new THREE.MeshStandardMaterial({
        color: 0x964B00, 
        roughness: 0.5,
        metalness: 0.7,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial7;
        }
    });

    const additionalObject7Scale = 0.4; 
    obj.scale.set(additionalObject7Scale, additionalObject7Scale, additionalObject7Scale);

    obj.position.set(17.5, 3, -6.5);

    scene.add(obj);
});

const additionalObject8Loader = new OBJLoader();
const additionalObject8Url = 'Soda_Can.obj'; 
additionalObject8Loader.load(additionalObject8Url, (obj) => {
    const coloredMaterial8 = new THREE.MeshStandardMaterial({
        color: 0x00ffff, 
        roughness: 0.5,
        metalness: 1,
    });

    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = coloredMaterial8;
        }
    });

    const additionalObject8Scale = 0.2; 
    obj.scale.set(additionalObject8Scale, additionalObject8Scale, additionalObject8Scale);

    obj.position.set(-7, 3, -6);

    scene.add(obj);
});


const movingCube1Geometry = new THREE.BoxGeometry(1, 1, 1);
const movingCube1Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const movingCube1 = new THREE.Mesh(movingCube1Geometry, movingCube1Material);
movingCube1.position.set(-10, 10, 5);
scene.add(movingCube1);

const movingCube2Geometry = new THREE.BoxGeometry(1, 1, 1);
const movingCube2Material = new THREE.MeshBasicMaterial({ color: 0xff00ff }); 
const movingCube2 = new THREE.Mesh(movingCube2Geometry, movingCube2Material);
movingCube2.position.set(-10, 10, 8); 
scene.add(movingCube2);


function animateMovingCubes() {
    const time = performance.now() * 0.001;

    movingCube1.position.y = Math.sin(time) * 2 + 2; 
    movingCube2.position.y = Math.sin(time + Math.PI) * 2 + 2; 

    requestAnimationFrame(animateMovingCubes);
}

animateMovingCubes();

const extrusionShape = new THREE.Shape();
extrusionShape.moveTo(0, 0);
extrusionShape.lineTo(1, 0);
extrusionShape.lineTo(1, 1);
extrusionShape.lineTo(0, 1);
extrusionShape.lineTo(0, 0);

const extrusionSettings = {
    depth: 0.5, 
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 1,
};

const extrusionGeometry = new THREE.ExtrudeGeometry(extrusionShape, extrusionSettings);
const extrusionMaterial = new THREE.MeshStandardMaterial({ color: 0xffa6c9, roughness: 0.5, metalness: 0.9 });
const extrusionMesh = new THREE.Mesh(extrusionGeometry, extrusionMaterial);
extrusionMesh.position.set(8, 1, 2); 
scene.add(extrusionMesh);



for (let i = 0; i < middleCubesCount; i++) {
    const middleCube = new THREE.Mesh(geometry1, material1.clone());
    middleCube.scale.set(cubeScale, cubeScale, cubeScale);
    middleCube.position.set(i * 3.5 - (middleCubesCount - 1), cubeOffsetY, -6);
    scene.add(middleCube);
    middleCubes.push(middleCube);
}


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

camera.position.set(15, 15, 15);
camera.lookAt(scene.position);
camera.position.z = 15;

const moveState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveState.forward = true;
            break;
        case 'KeyS':
            moveState.backward = true;
            break;
        case 'KeyA':
            moveState.left = true;
            break;
        case 'KeyD':
            moveState.right = true;
            break;
    }
}

function handleKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            moveState.forward = false;
            break;
        case 'KeyS':
            moveState.backward = false;
            break;
        case 'KeyA':
            moveState.left = false;
            break;
        case 'KeyD':
            moveState.right = false;
            break;
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (moveState.forward) {
        camera.translateZ(-0.1);
    }
    if (moveState.backward) {
        camera.translateZ(0.1);
    }
    if (moveState.left) {
        camera.translateX(-0.1);
    }
    if (moveState.right) {
        camera.translateX(0.1);
    }

    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.01;

    cube2.rotation.x -= 0.01;
    cube2.rotation.y -= 0.01;

     
     const time = performance.now() * 0.001;
     const colorValue = Math.sin(time) * 0.5 + 0.5; 
     const color = new THREE.Color().setHSL(colorValue, 1, 0.5);
 
     middleCubes.forEach((cube) => {
         cube.material.color.copy(color);
     });

    controls.update(); 

    renderer.render(scene, camera);
}

animate();
