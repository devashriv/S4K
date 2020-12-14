//all imported scripts go here

import * as THREE from '../../build/three.module.js';



let camera, scene, renderer;

let mesh, geometry, material, clock;
let torus, torusShadow;
let torus2, torus2Shadow;
let torus3, torus3Shadow;

const sunLight = new THREE.DirectionalLight( 'rgb(255,255,255)', 1 );
let useDirectionalLight = true;
let lightSphere, lightHolder;
const lightPosition4D = new THREE.Vector4();

const worldWidth = 128, worldDepth = 128;
let verticalAngle = 0;
let horizontalAngle = 0;
let frameTime = 0;
let velocity_init = 3.5;
let dx = 0.0;
const TWO_PI = Math.PI * 2;
const radius = 8, tube = 4;
const xoff = -50, yoff = 7.5, zoff = -15;
const dens1 = 3.0, dens2 = 2.0, dens3 = 1.0;
const cd1 = 1.0, cd2 = 1.0, cd3 = 1.0;
const area1 = 1.0, area2 = 1.0, area3 = 1.0;
const vol1 = 1.0, vol2 = 1.0, vol3 = 1.0;
const mass1 = dens1 * vol1; 
const mass2 = dens2 * vol2; 
const mass3 = dens3 * vol3;
const alp1 = 0.5 * dens1 * cd1 * area1 / mass1;
const alp2 = 0.5 * dens2 * cd2 * area2 / mass2;
const alp3 = 0.5 * dens3 * cd3 * area3 / mass3;
let E0 = 50;
let v1_0 = Math.sqrt(E0/mass1);
let v2_0 = Math.sqrt(E0/mass2);
let v3_0 = Math.sqrt(E0/mass3);


init();
animate();

function init() {

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 0, 10, 60 );

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xaaccff );
    // scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );

    sunLight.position.set( 5, 7, - 1 );
    sunLight.lookAt( scene.position );
    scene.add( sunLight );

    lightPosition4D.x = sunLight.position.x;
    lightPosition4D.y = sunLight.position.y;
    lightPosition4D.z = sunLight.position.z;
    // amount of light-ray divergence. Ranging from:
    // 0.001 = sunlight(min divergence) to 1.0 = pointlight(max divergence)
    lightPosition4D.w = 0.001; // must be slightly greater than 0, due to 0 causing matrixInverse errors

    // LIGHTBULB
    const lightSphereGeometry = new THREE.SphereBufferGeometry( 0.09 );
    const lightSphereMaterial = new THREE.MeshBasicMaterial( { color: 'rgb(255,255,255)' } );
    lightSphere = new THREE.Mesh( lightSphereGeometry, lightSphereMaterial );
    scene.add( lightSphere );
    lightSphere.visible = false;

    const lightHolderGeometry = new THREE.CylinderBufferGeometry( 0.05, 0.05, 0.13 );
    const lightHolderMaterial = new THREE.MeshBasicMaterial( { color: 'rgb(75,75,75)' } );
    lightHolder = new THREE.Mesh( lightHolderGeometry, lightHolderMaterial );
    scene.add( lightHolder );
    lightHolder.visible = false;

    geometry = new THREE.PlaneBufferGeometry( 20000, 20000, worldWidth - 1, worldDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );

    const position = geometry.attributes.position;
    position.usage = THREE.DynamicDrawUsage;

    for ( let i = 0; i < position.count; i ++ ) {

        const y = 35 * Math.sin( i / 2 );
        position.setY( i, y );

    }

    const texture = new THREE.TextureLoader().load( '../examples/textures/water.jpg' );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 5, 5 );

    material = new THREE.MeshBasicMaterial( { color: 0x0044ff, map: texture } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // MAGENTA TORUS and TORUS' SHADOW
    const torusGeometry = new THREE.TorusBufferGeometry( radius, tube, 10, 16, TWO_PI );
    const torusMaterial = new THREE.MeshPhongMaterial( { color: 'rgb(255,0,255)', emissive: 0x200020 } );
    torus = new THREE.Mesh( torusGeometry, torusMaterial );
    torus.position.x = xoff;
    torus.position.y = yoff;
    torus.position.z = zoff - 50;
    scene.add( torus );

    //torusShadow = new ShadowMesh( torus );
    //scene.add( torusShadow );

    // MAGENTA TORUS and TORUS' SHADOW
    const torus2Geometry = new THREE.TorusBufferGeometry( radius, tube, 10, 16, TWO_PI );
    const torus2Material = new THREE.MeshPhongMaterial( { color: 'rgb(255,255,0)', emissive: 0x200020 } );
    torus2 = new THREE.Mesh( torus2Geometry, torus2Material );
    torus2.position.x = xoff;
    torus2.position.y = yoff;
    torus2.position.z = zoff - 25;
    scene.add( torus2 );

    // torus2Shadow = new ShadowMesh( torus2 );
    // scene.add( torus2Shadow );

    // MAGENTA TORUS and TORUS' SHADOW
    const torus3Geometry = new THREE.TorusBufferGeometry( radius, tube, 10, 16, TWO_PI );
    const torus3Material = new THREE.MeshPhongMaterial( { color: 'rgb(0,255,255)', emissive: 0x200020 } );
    torus3 = new THREE.Mesh( torus3Geometry, torus3Material );
    torus3.position.x = xoff;
    torus3.position.y = yoff;
    torus3.position.z = zoff - 0;
    scene.add( torus3 );

    // torus3Shadow = new ShadowMesh( torus3 );
    // scene.add( torus3Shadow );
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    loadDucky1();



}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();

}

//

function animate() {

    requestAnimationFrame( animate );

    frameTime = clock.getDelta();

    horizontalAngle += 0.5 * frameTime;
    verticalAngle += 1.5 * frameTime;
    if ( verticalAngle > TWO_PI )
        verticalAngle -= TWO_PI;
    if ( horizontalAngle > TWO_PI )
        horizontalAngle -= TWO_PI;

    torus.rotation.x -= 0.0 * frameTime;
    torus.rotation.y -= 0.0 * frameTime;
    torus.position.x += velocity_init * Math.log(1 + alp1 * v1_0 * frameTime);// Math.cos( horizontalAngle ) * 4;
    torus.position.y = Math.cos( verticalAngle ) * 1.5 + 2;

    torus2.rotation.x -= 0.0 * frameTime;
    torus2.rotation.y -= 0.0 * frameTime;
    torus2.position.x += velocity_init * Math.log(1 + alp2 * v2_0 * frameTime);// Math.cos( horizontalAngle ) * 4;
    torus2.position.y = Math.cos( verticalAngle ) * 1.5 + 2;

    torus3.rotation.x -= 0.0 * frameTime;
    torus3.rotation.y -= 0.0 * frameTime;
    torus3.position.x += velocity_init * Math.log(1 + alp3 * v3_0 * frameTime);// Math.cos( horizontalAngle ) * 4;
    torus3.position.y = Math.cos( verticalAngle ) * 1.5 + 2;

    render();

}

function render() {

    const delta = clock.getDelta();
    const time = clock.getElapsedTime() * 10;

    const position = geometry.attributes.position;

    for ( let i = 0; i < position.count; i ++ ) 
    {
        const y = 2 * Math.sin( i / 5 + ( time + i ) / 7 );
        position.setY( i, y );
    }

    position.needsUpdate = true;

    renderer.render( scene, camera );

}

function loadDucky1() {
    const texture = new THREE.TextureLoader().load( "./media/golfball.jpg" );
    var loader = new PLYLoader();
    loader.load(
      "./models/Ducky1.ply",
      function (geometry) {
        geometry.computeVertexNormals();
        var material = new THREE.MeshBasicMaterial( { map: texture } );
        ducky1 = new THREE.Mesh(geometry, material);

        //default position
        ducky1.position.y = 50;
        ducky1.position.x=-50;



        ducky1.castShadow = true;
        ducky1.receiveShadow = true;

        scene.add(ducky1);
        //objects.push(ducky1);


      }
    );
  }