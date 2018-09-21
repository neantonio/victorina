import { Component, OnInit } from '@angular/core';
import {RotGameProcessService} from '../services/rot-game-process.service'

import {MyRouterService} from '../services/my-router.service'

@Component({
  selector: 'app-rot-main-screen',
  templateUrl: './rot-main-screen.component.html',
  styleUrls: ['./rot-main-screen.component.css']
})
export class RotMainScreenComponent implements OnInit {

  constructor(private gameProcess:RotGameProcessService,private myRouter:MyRouterService) { }

  horisontalSquareItems;
  verticalSquareItems;
  itemRotation;
  itemCorrectRotation;

  horisontalSquareValue;
  verticalSquareValue;

  squareSide;

  imgWidth;
  imgHeight;

  useTransition=false;
  rotated=false;
  correctValue=0;
  sourceNotCorrectValue=0;
  currentNotCorrectValue=0
  

  ngOnInit() {

    this.horisontalSquareValue=this.gameProcess.horValue;
    this.verticalSquareValue=this.gameProcess.vertValue;
   
    var img = new Image();
    img.onload =() =>{
        this.imgWidth=img.width ;
        this.imgHeight= img.height;

        let tx= this.imgWidth/this.verticalSquareValue;
        let ty= this.imgHeight/this.horisontalSquareValue;

        this.squareSide=Math.min(tx,ty);

        this.initArrays()

      // setTimeout(()=>this.useTransition=true,200)     //чтобы первоначальный перевот произошел моментально, а при взаимодействии с пользователем был транзишн

      this.useTransition=true;
      setTimeout(()=>this.initRotation(),2500) 


    }
    img.src = 'assets/public/img/temp.jpg';
  }

  private initArrays(){

    this.horisontalSquareItems=[];
    this.verticalSquareItems=[];
    this.itemRotation=[];
    this.itemCorrectRotation=[];

    for(let i=0;i<this.horisontalSquareValue;i++) this.horisontalSquareItems.push(null);
    for(let i=0;i<this.verticalSquareValue;i++) this.verticalSquareItems.push(null);

     

  }

  private initRotation(){
    this.rotated=true;
    for(let i=0;i<this.horisontalSquareValue*this.verticalSquareValue;i++){
        let rot=Math.floor(Math.random()*3.99)*90  //3.99 чтобы избежать выпадения 360
        this.itemRotation.push(rot); 
        if(rot==0)     this.itemCorrectRotation.push(true);
        else         {
          this.itemCorrectRotation.push(false);
          this.sourceNotCorrectValue++;
        }

      }
      this.currentNotCorrectValue=this.sourceNotCorrectValue;
  }

  getItemWidth(){
    return this.squareSide
  }
  getItemHeight(){
    return this.squareSide
  }

  getItemRotation(rowOrder,columnOrder){
   
    let itemIndex=this.getItemIndex(rowOrder,columnOrder);
     return this.itemRotation[itemIndex];
  }
  rotateItem(rowOrder,columnOrder,event){

   
  
    if(!this.rotated) return;
  
    let itemIndex=this.getItemIndex(rowOrder,columnOrder);
    this.itemRotation[itemIndex]=this.itemRotation[itemIndex]+90;

    if(this.itemRotation[itemIndex]%360==0) {
      this.itemCorrectRotation[itemIndex]=true;
      
    }
    else {
      this.itemCorrectRotation[itemIndex]=false;
      
    }

    this.checkForCorrectRotation();
  }

  onContext($event){
 console.log(event);
  }

  private getItemIndex(rowOrder,columnOrder){
    return (rowOrder)*(this.horisontalSquareValue)+columnOrder;
  }
  private checkForCorrectRotation(){
    let result=true;
    let notCorrect=0
    this.itemCorrectRotation.forEach((item,i,arr)=>{
      if(!item) {
        result=false;
        notCorrect++;
      }

    })
    this.currentNotCorrectValue=notCorrect;
    if(result) this.gameProcess.onGameFinish();
    return result;
  }

  getWrapperHeight(){
    return this.squareSide*this.verticalSquareValue;
  }
  getWrapperWidth(){
    return this.squareSide*this.horisontalSquareValue;
  }

  getProgressValue() {
    return (this.sourceNotCorrectValue-this.currentNotCorrectValue) / this.sourceNotCorrectValue * 100;
  }

}
