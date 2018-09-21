import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {MyRouterService} from '../services/my-router.service'
import {LanguageService} from '../services/language.service'
import {ModalDialogService} from '../services/modal-dialog.service'
import {GameProcessService} from '../services/game-process.service'

import {ItemDescription} from '../services/content-provider.service'

import {RotGameProcessService} from '../services/rot-game-process.service'

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'vic-begin-screen',
  templateUrl: './vic-begin-screen.component.html',
  styleUrls: ['./vic-begin-screen.component.css']
})
export class VicBeginScreenComponent implements OnInit {

  constructor(private languageService:LanguageService,
              private dialogService:ModalDialogService,
              private gameProcess:GameProcessService,
              private myRouter:MyRouterService,
              private rotGameProcess:RotGameProcessService,
              public auth:  AuthService) {

                console.log(auth)

        // auth.handleAuthentication();    
             
   }

  levelDialog;

  ngOnInit() {
  }

  
 

  onBeginNewGame(){
    let clickFun=(hardLevelIndex)=>{
      
    this.gameProcess.setHardLevel(hardLevelIndex);
    this.gameProcess.initNewGame();
    this.gameProcess.beginNewGame();
    this.myRouter.toGamePage();
  
    }

    let dialogStruct=[];
      dialogStruct.push( {items: [{type:'text',textValue:'hard_level',}],align:'center',direction:'row',width:'200px'})

    this.gameProcess.getAvailableHardLevelDescriptions().forEach((item,i,arr)=>{
      dialogStruct.push({items: [{type:'button',textValue:item,clickCallback:()=>clickFun(i),closeDialogOnClick:true}],align:'center',direction:'row'})
    })

    this.dialogService.createCustomDialog({data:dialogStruct, disableClose: true});
  
  }

  onBeginGame2(){
    let clickFun=(h,v)=>{
      
    // this.gameProcess.setHardLevel(hardLevelIndex);
    // this.gameProcess.initNewGame();
    // this.gameProcess.beginNewGame();
    this.rotGameProcess.horValue=h;
    this.rotGameProcess.vertValue=v;
    this.myRouter.toGame2Page();
  
  }

  let dialogStruct=[];
      dialogStruct.push( {items: [{type:'text',textValue:'game_field_size'}],align:'center',direction:'row',width:'200px'})
  
  for(let i=3;i<7;i++){
    dialogStruct.push({items: [{type:'button',textValue:i+'x'+i,clickCallback:()=>clickFun(i,i),closeDialogOnClick:true}],align:'center',direction:'row'})
  }

    this.dialogService.createCustomDialog({data:dialogStruct, disableClose: true});
  }


  onHowToPlay(){
    this.dialogService.createTextDialog(ItemDescription.getConstant('description_quiz').advice)
  }
  onHowToPlay2(){
     this.dialogService.createTextDialog(ItemDescription.getConstant('description_rotate').advice)
  }

}
