import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import * as THREE from 'three'

import {GameProcessService,ITip} from '../services/game-process.service'

declare const require: (moduleId: string) => any;
var OrbitControls = require('three-orbit-controls')(THREE)

import * as OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

var MTLLoader = require('three-mtl-loader');
var mtlLoader = new MTLLoader();

@Component({
  selector: 'vic-scene',
  templateUrl: './vic-scene.component.html',
  styleUrls: ['./vic-scene.component.css']
})
export class VicSceneComponent implements OnInit {

  constructor(private gameProcess:GameProcessService) {

    this.gameProcess.getTipObservable().subscribe((data:ITip)=>{
      let t=false;
      if(data.type=='light') {
        this.enableLight();
        t=true;
      }
      if(data.type=='rotation') {
        this.endSceneRotation();
        this.enableOrbitConrolls();
        t=true;
      }
       if(data.type=='axis') {
        this.addRotationAxis()
        t=true;
      }
      if(t) this.renderThis();
      console.log(data);

    })
    this.gameProcess.getPauseObservable().subscribe((data)=>{
      if(data) this.pauseSceneRotation();
      else this.continueSceneRotation();
    })
    
   }

  @ViewChild('output') output;

  object;

  camera=null;
  scene=null;
  renderer=null;
  cameraOrbitControlls=null;

  rotationAnimationControllers : AnimationController[]=[];
  objectOnScene;

  ngOnInit() {
   
    this.renderer = new THREE.WebGLRenderer();
    
    this.initRenderer(this.renderer, this.output.nativeElement);
  
  }

  disableAll(){
    this.refreshScene();
    this.disableOrbitConrolls();
    this.endSceneRotation()

  }

  addRotationAxis(){
     let animationController=new AnimationController()
      let vector=new THREE.Vector3(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1);
      console.log(vector);
      let angle=Math.PI/275;                           //оборот за три секунды с учетом 25ти кадров в секунду
      animationController.framesPerSecond=50;
    
    animationController.animationFunction=()=>{
      this.objectOnScene.rotateOnWorldAxis(vector,angle);   
      this.renderThis();
      
    }
    animationController.start();
    this.rotationAnimationControllers.push(animationController);
  }

  beginSceneRotation(){
   if(this.rotationAnimationControllers.length==0)this.addRotationAxis();
  }
  pauseSceneRotation(){
     this.rotationAnimationControllers.forEach((item,i,arr)=>item.pause());
  }
  continueSceneRotation(){
     this.rotationAnimationControllers.forEach((item,i,arr)=>item.continue());
  }

  endSceneRotation(){
    this.rotationAnimationControllers.forEach((item,i,arr)=>item.stop());
    this.rotationAnimationControllers=[];
  }

  applyObject(object) {
    this.object=object;

    this.disableAll();
    this.initCamera();

    this.object=object;
    let mtlLoader = new MTLLoader();
    //mtlLoader.setBaseUrl(this.object.path);
    //mtlLoader.setPath(this.object.path);
    var url = this.object.path+this.object.name + ".mtl";
    mtlLoader.load(url, (materials) => {

      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      console.log(materials);
      //objLoader.setMaterials(new THREE.MeshBasicMaterial())
     // objLoader.setPath(this.object.path);
      objLoader.load(this.object.path+this.object.name + '.obj', (object) => {

        this.objectOnScene=object;
        this.scene.add(object);
        this.renderThis();
        this.beginSceneRotation();

      }, );

    });

  }



  enableOrbitConrolls() {
    this.addOrbitControllsToCamera(this.camera, this.renderer, this.scene);
  }
  disableOrbitConrolls(){
    if(this.cameraOrbitControlls!=null) this.cameraOrbitControlls.enabled=false;
  }

  enableLight() {
    console.log(this);
    var ambientLight1 = new THREE.AmbientLight('#fff');
    this.scene.add(ambientLight1);
    var spLight = new THREE.SpotLight(0xffffff, 1.75, 2000, Math.PI / 3);
    spLight.castShadow = true;
    spLight.position.set(-5*this.object.scale, 5*this.object.scale, -5*this.object.scale);
    this.scene.add(spLight);
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    this.scene.add(ambientLight);
  }

  private initCamera() {

    this.disableOrbitConrolls();
    if(this.camera==null) this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);;;
     
    this.camera.aspect =this.output. nativeElement.offsetWidth /this.output.  nativeElement.offsetHeight;
    this.camera.position.x = -1*this.object.scale;
    this.camera.position.y = 2*this.object.scale;
    this.camera.position.z = 1*this.object.scale;

    if (this.scene != null) this.camera.lookAt(this.scene.position);

    this.camera.updateProjectionMatrix();
  }

  private addOrbitControllsToCamera(camera, renderer, scene) {
    this.cameraOrbitControlls = new OrbitControls(camera, renderer.domElement);
    this.cameraOrbitControlls.addEventListener('change', () => {
      this.renderThis();
      console.log(this,this.camera.position);

    })
  }
  private initRenderer(renderer, nativeElement) {
    renderer.setClearColor(0xFFFFFF);
    renderer.setSize(nativeElement.offsetWidth, nativeElement.offsetHeight);
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
    nativeElement.append(renderer.domElement);
  }

  refreshScene() {
    this.scene = new THREE.Scene();
  }

  renderThis() {
    this.renderer.render(this.scene, this.camera)
  }

}

//в начале вызывается старт
//в конце стоп для освобождения реурсов
//пауза и континью для приостановки и запуска
class AnimationController {
  animationFunction = null;
  interval = null;
  duration = null;             // in ms
  framesPerSecond = 25;
  timePassed = 0;                   //in ms
  animationRunning: boolean;


  start(duration?) {
    this.duration=duration;
    this.animationRunning = true;
    this.interval = setInterval(() => {
     
      if (this.animationRunning) {
        this.animationFunction();
        this.timePassed = this.timePassed + 1000 / this.framesPerSecond;
        if(this.duration!=null){
          if(this.timePassed>this.duration) this.stop();
        }
      }
    }, 1000 / this.framesPerSecond);
  }
  stop() {
    clearInterval(this.interval);
  }
  pause() {
    this.animationRunning = false;
  }
  continue() {
    this.animationRunning = true;
  }

}
