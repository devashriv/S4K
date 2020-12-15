//all imported scripts go here

import * as THREE from '../../build/three.module.js';

import { OrbitControls } from '../../examples/jsm/controls/OrbitControls.js';

import { PLYLoader } from "../../examples/jsm/loaders/PLYLoader.js";

let camera, scene, renderer, controls;

let mesh, geometry, material, clock;

let ducky1, ducky2, ducky3;

const sunLight = new THREE.DirectionalLight( 'rgb(255,255,255)', 1 );
let lightSphere, lightHolder;
const lightPosition4D = new THREE.Vector4();

const worldWidth = 128, worldDepth = 128;
let verticalAngle = 0;
let horizontalAngle = 0;
let frameTime = 0;
let velocity_init = 3.5;
const TWO_PI = Math.PI * 2;
const xoff = -50, yoff = 7.5, zoff = -15;
const dens1 = 3.0, dens2 = 2.0, dens3 = 1.0;
const cd1 = 1.0, cd2 = 1.0, cd3 = 1.0;
const area1 = 1.0, area2 = 1.0, area3 = 1.0;
const vol1 = 0.5, vol2 = 0.5, vol3 = 0.5;
let E0 = 750;

let geom1, mat1, cube1;
let geom_finishline1, mat_finishline1, cube_finishline1, yfinishline1 = 45, xfinishline = 500;
let geom_finishline2, cube_finishline2, yfinishline2 = 20;
let geom_finishline3, cube_finishline3;

function compute_mass(density, volume)
{
    return density * volume;
}
const mass1 = compute_mass(dens1, vol1); 
const mass2 = compute_mass(dens2, vol2);
const mass3 = compute_mass(dens3, vol3);

function compute_initial_velocity(energy, mass)
{
    return Math.sqrt(energy/mass);
}
const v1_0 = compute_initial_velocity(E0, mass1);
const v2_0 = compute_initial_velocity(E0, mass2);
const v3_0 = compute_initial_velocity(E0, mass3);

function compute_drag_factor(CD, density, area, mass)
{
    return 0.5 * density * CD * area / mass;
}

const alp1 = compute_drag_factor(cd1, dens1, area1, mass1);
const alp2 = compute_drag_factor(cd2, dens2, area2, mass2);
const alp3 = compute_drag_factor(cd3, dens3, area3, mass3);

init();
animate();

function init() {

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 0, 10, 300 );

    controls = new OrbitControls( camera, renderer.domElement );

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xaaccff );
    // scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );



    sunLight.position.set( 5, 7, - 1 );
    sunLight.lookAt( scene.position );
    scene.add( sunLight );
//
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
//
    const lightHolderGeometry = new THREE.CylinderBufferGeometry( 0.05, 0.05, 0.13 );
    const lightHolderMaterial = new THREE.MeshBasicMaterial( { color: 'rgb(75,75,75)' } );
    lightHolder = new THREE.Mesh( lightHolderGeometry, lightHolderMaterial );
    scene.add( lightHolder );
    lightHolder.visible = false;

    geometry = new THREE.PlaneBufferGeometry( 20000, 20000, worldWidth - 1, worldDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );

    const positionP = geometry.attributes.position;
    positionP.usage = THREE.DynamicDrawUsage;

    for ( let i = 0; i < positionP.count; i ++ ) {

        const y = 35 * Math.sin( i / 2 );
        positionP.setY( i, y );

    }

    const texture = new THREE.TextureLoader().load( '../examples/textures/water.jpg' );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 5, 5 );

    material = new THREE.MeshBasicMaterial( { color: 0x0044ff, map: texture } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    

    geom1 = new THREE.BoxGeometry( 2, 4, 50 );
    mat1 = new THREE.MeshStandardMaterial( { color: 'rgb(101,21,0)' } );
    cube1 = new THREE.Mesh( geom1, mat1 );
    cube1.position.x = xoff - 5;
    cube1.position.y = 2.5;
    cube1.position.z = zoff;

    scene.add( cube1 );

    mat_finishline1 = new THREE.MeshStandardMaterial( { color: 'rgb(0,255,0)' } );

    geom_finishline1 = new THREE.BoxGeometry( 4, 2, 200 );
    cube_finishline1 = new THREE.Mesh( geom_finishline1, mat_finishline1 );
    cube_finishline1.position.x = xoff + xfinishline;
    cube_finishline1.position.y = yfinishline1;
    cube_finishline1.position.z = zoff;

    geom_finishline2 = new THREE.CylinderGeometry( 2, 2, 50 );
    cube_finishline2 = new THREE.Mesh( geom_finishline2, mat_finishline1 );
    cube_finishline2.position.x = xoff + xfinishline;
    cube_finishline2.position.y = yfinishline2;
    cube_finishline2.position.z = zoff - 100;

    geom_finishline3 = new THREE.CylinderGeometry( 2, 2, 50 );
    cube_finishline3 = new THREE.Mesh( geom_finishline3, mat_finishline1 );
    cube_finishline3.position.x = xoff + xfinishline;
    cube_finishline3.position.y = yfinishline2;
    cube_finishline3.position.z = zoff + 100;

    scene.add( cube_finishline1 );
    scene.add( cube_finishline2 );
    scene.add( cube_finishline3 );
    

    window.addEventListener( 'resize', onWindowResize, false );
    loadDucky1();
    loadDucky2();
    loadDucky3();
}
function loadDucky1() {
    const texture = new THREE.TextureLoader().load( "./media/golfball.jpg" );
    var loader = new PLYLoader();
    loader.load(
      "./models/Duck-1.ply",
      function (geometry) {
        geometry.computeVertexNormals();
        var material = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            flatShading: true,
          });
        ducky1 = new THREE.Mesh(geometry, material);

        //default position
        ducky1.position.x = xoff;
        ducky1.position.y = yoff;
        ducky1.position.z = zoff + 50;
        ducky1.castShadow = true;
        ducky1.receiveShadow = true;

        scene.add(ducky1);
      }
    );
  }

function loadDucky2() {
    const texture = new THREE.TextureLoader().load( "./media/crate.gif" );
    var loader = new PLYLoader();
    loader.load(
      "./models/Duck-2.ply",
      function (geometry) {
        //geometry.computeVertexNormals();
        var material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            flatShading: true,
          });
        ducky2 = new THREE.Mesh(geometry, material);

        //default position
        ducky2.position.x = xoff;
        ducky2.position.y = yoff;
        ducky2.position.z = zoff - 50;
        ducky2.castShadow = true;
        ducky2.receiveShadow = true;

        scene.add(ducky2);
      }
    );
  }

function loadDucky3() {
    const texture = new THREE.TextureLoader().load( "./media/disturb.jpg" );
    var loader = new PLYLoader();
    loader.load(
      "./models/Duck-3.ply",
      function (geometry) {
        geometry.computeVertexNormals();
        var material = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            flatShading: true,
          });
        ducky3 = new THREE.Mesh(geometry, material);

        //default position
        ducky3.position.x = xoff;
        ducky3.position.y = yoff;
        ducky3.position.z = zoff - 0;
        ducky3.castShadow = true;
        ducky3.receiveShadow = true;

        scene.add(ducky3);
      }
    );
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
    const currentTime = clock.getElapsedTime();

    horizontalAngle += 0.5 * frameTime;
    verticalAngle += 1.5 * frameTime;
    if ( verticalAngle > TWO_PI )
        verticalAngle -= TWO_PI;
    if ( horizontalAngle > TWO_PI )
        horizontalAngle -= TWO_PI;
    
    if (currentTime < 2)
    {
        cube1.position.x -= 10 * frameTime;
        cube1.position.y = Math.cos( verticalAngle ) * 1.5 + 2;
    }
    else if (currentTime >= 2 && currentTime < 2.5)
    {
        cube1.position.x += (currentTime - 1.25) * (currentTime - 1.25);
        cube1.position.y = Math.cos( verticalAngle ) * 1.5 + 2;
    }
    else
    {
        cube1.position.y = Math.cos( verticalAngle ) * 1.5 + 2;
        ducky1.position.x = xoff + v1_0 * Math.log(1 + alp1 * v1_0 * (currentTime-2.5));// Math.cos( horizontalAngle ) * 4;
        ducky2.position.x = xoff + v2_0 * Math.log(1 + alp2 * v2_0 * (currentTime-2.5));// Math.cos( horizontalAngle ) * 4;
        ducky3.position.x = xoff + v3_0 * Math.log(1 + alp3 * v3_0 * (currentTime-2.5));// Math.cos( horizontalAngle ) * 4;
    }
    ducky1.position.y = Math.cos( verticalAngle ) * 1.5 + 2;
    ducky2.position.y = Math.cos( verticalAngle ) * 1.5 + 2;
    ducky3.position.y = Math.cos( verticalAngle ) * 1.5 + 2;
    cube_finishline1.position.y = Math.cos( verticalAngle ) * 1.5 + yfinishline1;
    cube_finishline2.position.y = Math.cos( verticalAngle ) * 1.5 + yfinishline2;
    cube_finishline3.position.y = Math.cos( verticalAngle ) * 1.5 + yfinishline2;


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

