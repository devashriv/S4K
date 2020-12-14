//all imported scripts go here

import * as THREE from '../../build/three.module.js';

import { OrbitControls } from '../../examples/jsm/controls/OrbitControls.js';

import { PLYLoader } from "../../examples/jsm/loaders/PLYLoader.js";

let camera, scene, renderer;

let mesh, geometry, material, clock;

let objects, ducky1;

const worldWidth = 500, worldDepth = 500;

init();
animate();

function init() {

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.y = 200;
    camera.lookAt(0,0,-1);
    //camera.position.set( 1, 2, - 3 );
    //camera.lookAt( 0, 1, 0 );
    

    let controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render );
				controls.minDistance = 50;
				controls.maxDistance = 1000;
				controls.enablePan = false;
				controls.target.set( 0, 20, 0 );
				controls.update();

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xaaccff );
    scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );

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

    render();

}

function render() {

    const delta = clock.getDelta();
    const time = clock.getElapsedTime() * 10;

    const position = geometry.attributes.position;

    for ( let i = 0; i < position.count; i ++ ) {

        const y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );
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