import { Component, OnInit, ViewChild } from '@angular/core';

import { GameProcessService, GameScreenItem, ITip } from '../services/game-process.service'
import { VicSceneComponent } from '../vic-scene/vic-scene.component'

import {MyRouterService} from '../services/my-router.service'

@Component({
  selector: 'app-vic-game-screen',
  templateUrl: './vic-game-screen.component.html',
  styleUrls: ['./vic-game-screen.component.css']
})
export class VicGameScreenComponent implements OnInit {

  @ViewChild(VicSceneComponent) scene: VicSceneComponent;

  constructor(private gameProcess: GameProcessService,private myRouter:MyRouterService) {

  }
  gameItem: GameScreenItem;
  avilableTips: ITip[];
  tipUsedOnThisStep: ITip[] = [];
  gameLimitText: string[];
  waitingForAnswerResult = false;
  seectedVariant = null;
  correctVariant = null;

  buttonColors;


  ngOnInit() {
    let gameItem = this.gameProcess.getNextGameItem();

    if (gameItem != null) {
      this.gameItem=gameItem;
      this.scene.applyObject(this.gameItem.object);
      this.avilableTips = this.gameProcess.getAvailableTips();
      this.processButtonColors();

      this.gameLimitText = this.gameProcess.getCurrentLimitState();              //в начале инициализируем, потом слушаем изменения
      this.gameProcess.getLimitStateChangeObservable().subscribe((data) => {
        this.gameLimitText = data;
      })

      this.seectedVariant = null;
      this.correctVariant = null;
      this.tipUsedOnThisStep = [];
    }


  }

  isButtonDisabled(tip: ITip) {
    if (this.tipUsedOnThisStep.indexOf(tip) != -1) return false;         //если подсказка использовалась на текущем шаге, то пусть она будет праймари цвета
    return !this.gameProcess.canUseTip(tip.type)
  }
  useTip(tip: ITip) {
    console.log(tip, this.isTipUsed(tip), this.tipUsedOnThisStep.indexOf(tip));

    //если подсказка уже использована, то кнопка меняет цвет, но действие не выполняется
    if (!this.isTipUsed(tip)) {
      this.tipUsedOnThisStep.push(tip);
      this.gameProcess.useTip(tip.type);
    }
  }
  isTipUsed(tip: ITip) {
    return (this.tipUsedOnThisStep.indexOf(tip) != -1)
  }

  onSelectVariant(variant) {
    if (this.seectedVariant != null) return;          //если что-то выбрали больше не выбираем

    this.seectedVariant = variant;
    this.waitingForAnswerResult = true;

    setTimeout(() => {
      let answer = this.gameProcess.processAnswer(variant);
      this.correctVariant = answer.correctValue;
      this.waitingForAnswerResult = false;
      this.processButtonColors();

      setTimeout(() => this.ngOnInit(), 3000);

    }, 1700)

  }
  onPause() {
    this.gameProcess.processPause();
  }

  isButtonGrey(variant) {
    //console.log(variant,((this.waitingForAnswerResult)&&(variant==this.seectedVariant)))
    return ((this.waitingForAnswerResult) && (variant == this.seectedVariant));
  }

  getButtonColor(buttonIndex) {
    // console.log('get',this.buttonColors[buttonIndex],buttonIndex);
    return this.buttonColors[buttonIndex];

  }

  processButtonColors() {
    this.buttonColors = [];
    this.gameItem.variants.forEach((item, i, arr) => {

      if ((this.seectedVariant == null) || (this.waitingForAnswerResult)) {     //или ничего не выбрано или ждем ответа
        this.buttonColors.push('default')
      }
      else {
        if (item == this.correctVariant) {
          this.buttonColors.push('primary')
        }
        else {
          if (item == this.seectedVariant) this.buttonColors.push('warn')
          else this.buttonColors.push('default')
        }
      }


    })
    console.log('proc', this.buttonColors)
  }

  getProgressValue() {
    return this.gameProcess.currentGameStepNumber / this.gameProcess.itemsPerGame * 100;
  }

}
