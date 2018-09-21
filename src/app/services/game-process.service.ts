import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ContentProviderService, GameStepItem, TextVariants ,ItemDescription} from './content-provider.service'
import { ModalDialogService } from './modal-dialog.service'
import {MyRouterService} from './my-router.service'


//то что будет отдаваться в компoнент
export class GameScreenItem {
  variants: string[];
  object;
}
export class AnswerResult {
  correct: boolean;
  correctValue: string;
}
export interface ITip {
  description: ItemDescription;
  icon: string;
  type: string;
  parameters: any;
}

export class HardLevel{
  description:ItemDescription;
  index:number;
  gameLimits:GameLimit[];
  categoryLevel:number;
  cameraZoom=1;
  variantsValue;
}


@Injectable()
export class GameProcessService {

  constructor(private contentProvider: ContentProviderService, private modalService: ModalDialogService,private router:MyRouterService) { }

  //нужно для начала игры
  hardLevel: HardLevel ;
  itemsPerGame: number = 10;
  availableTips = {
    light: { description: ItemDescription.getConstant('tip_light'),
             icon: 'lightbulb_outline', type: 'light', parameters: null },
    rotation: { description:  ItemDescription.getConstant('tip_rotation'),
               icon: '3d_rotation', type: 'rotation', parameters: null },
    axis: { description: ItemDescription.getConstant('tip_axis'),
              icon: 'rotate_right', type: 'axis', parameters: null },
    description: { description: ItemDescription.getConstant('tip_advice'),
               icon: 'message', type: 'description', parameters: null },
  }
  availableHardLevels:HardLevel[]=[
    {description:ItemDescription.getConstant('hard_level_easy'),
          index:0,gameLimits:[],categoryLevel:0,cameraZoom:1,variantsValue:3},
    {description:ItemDescription.getConstant('hard_level_medium'),
          index:1,gameLimits:[GameLimit.getAvailableGameLimits()[1]],categoryLevel:1,cameraZoom:1,variantsValue:4},
    {description:ItemDescription.getConstant('hard_level_hard'),
          index:2,gameLimits:GameLimit.getAvailableGameLimits(),categoryLevel:2,cameraZoom:1,variantsValue:4}
  ]


  //нужно в процессе игры
  currentGameStepNumber: number = 0;
  gameStepItems: GameStepItem[] = null;
  usedTips: string[] = [];
  currentGameStep: GameStepResult;
  //gameLimits: GameLimit[] = []
  limitStateChange = new Subject<any>();      //при изменении состояния игровых ограничений 
  limitStateChangeSubscription = null;          //подписка на изменение состояния ограничений. ограничения собираются вместе и пробрасываются уже через this.limitStateChange 
  tipUsed = new Subject<any>();               //при использовании подсказок
  gameOverSubscription = null;
  gamePaused = new Subject<any>();

  //нужно для обработки результатов игры
  gameStepResults: GameStepResult[] = [];
  timeCounter=new TimeCounter();

  //сдесь все параметры сбрасываем
  initNewGame() {
    this.currentGameStepNumber = 0;
    this.gameStepItems = null;
    this.usedTips = [];
    if (this.limitStateChangeSubscription != null) this.limitStateChangeSubscription.unsubscribe();
    this.limitStateChangeSubscription = null;
  }

  //а здесь например запускается отсчет времени
  beginNewGame() {
    console.log(this.hardLevel);
    this.hardLevel.gameLimits.forEach((item, i, arr) => {
      item.begin();
    })
    this.initLimitStateChangeSubscription();
    this.timeCounter.begin();
  }

  setHardLevel(level: number) {
    this.hardLevel =this.availableHardLevels[level];
  }

  // getAvailableGameLimits() {
  //   return GameLimit.getAvailableGameLimits();
  // }
  getAvailableHardLevelDescriptions(){
    let result=[];
    this.availableHardLevels.forEach((item,i,arr)=>{
      result.push(item.description.name);
    })
    return result;
  }
  // addGameLimit(gameLimitDescription: GameLimitDescription) {
  //   this.hardLevel.gameLimits.push(gameLimitDescription.gameLimit);
  //   this.initLimitStateChangeSubscription();
  // }


  canUseTip(tipName) {

    //проверяем использована ли подсказка      
    //наличие подсказки не проверяется, т.к клиенский код получает только доступные подсказки
    for (let i = 0; i < this.usedTips.length; i++) {
      if (this.usedTips[i] == tipName) return false;
    }
    return true;
  }

  //подразумевается, что клиенский код сначала вызовет canUseTip
  useTip(tipName) {

    this.usedTips.push(tipName);
    if (tipName == 'description') {
      this.availableTips.description.parameters = this.getCurrentGameItem().getVariantForHardLevel(this.hardLevel.categoryLevel).suggestion;
      this.modalService.createTextDialog(this.availableTips.description.parameters)
    }
    this.currentGameStep.useTip(tipName);
    this.tipUsed.next(this.availableTips[tipName]);
  }
  getAvailableTips() {
    let result = [];
    for (let key in this.availableTips) {
      result.push(this.availableTips[key])
    }
    return result;
  }

  getNextGameItem(): GameScreenItem {

    if (this.gameStepItems == null) this.gameStepItems = this.contentProvider.getRandomItems(this.itemsPerGame);
    
    if (this.currentGameStepNumber == this.gameStepItems.length) {
      this.onGameFinish();
      return null;
    }
    
    let result = new GameScreenItem();
    result.object = this.gameStepItems[this.currentGameStepNumber].sceneObject;
    result.variants = this.gameStepItems[this.currentGameStepNumber].getVariantForHardLevel(this.hardLevel.categoryLevel).variants;

    this.currentGameStepNumber++;

    this.createGameStepResult();

    return result;
  }

  processAnswer(value): AnswerResult {
    let result = new AnswerResult();
    let currentItem = this.getCurrentGameItem();
    let variants = currentItem.getVariantForHardLevel(this.hardLevel.categoryLevel);

    result.correctValue = variants.variants[variants.indexOfCorrect];
    result.correct = (value == result.correctValue);

    this.hardLevel.gameLimits.forEach((item, i, arr) => {
      item.processAnswer(result);
    })

    this.currentGameStep.correctAnswer=result.correct;

    return result;
  }
  processPause() {
   
    this.pauseGame();
    this.modalService.createActionDialog(ItemDescription.getConstant('button_pause').name, 
                                          ItemDescription.getConstant('button_pause').advice, () => this.continueGame())
  }

  getGameOverObservable() {
    return GameLimit.gameOver.asObservable();
  }
  getLimitStateChangeObservable() {
    return this.limitStateChange.asObservable();
  }
  getTipObservable() {
    return this.tipUsed.asObservable();
  }
  getPauseObservable() {
    return this.gamePaused.asObservable();
  }

  getCurrentLimitState() {
    let stateResult = [];
    this.hardLevel.gameLimits.forEach((item, i, arr) => {
      stateResult.push(item.stateDescription);
    }); 
    return stateResult;
  }

  private initLimitStateChangeSubscription() {
    if (this.limitStateChangeSubscription == null)
      this.limitStateChangeSubscription = GameLimit.currentStateChange.asObservable().subscribe((data) => {
        this.processLimitStateChange();
      })

    if (this.gameOverSubscription == null) {
      this.gameOverSubscription = GameLimit.gameOver.asObservable().subscribe((data) => {
        this.onGameFinish();
      })
    }
  }

  private processLimitStateChange() {

    this.limitStateChange.next(this.getCurrentLimitState());
  }

  private createGameStepResult() {
    //if (this.currentGameStep != null) 
    this.currentGameStep = new GameStepResult();
    this.currentGameStep.gameItem = this.getCurrentGameItem();
    this.currentGameStep.gameStepNumber = this.currentGameStepNumber;
    this.gameStepResults.push(this.currentGameStep);
  }

  private onGameFinish() {

    this.timeCounter.stop();

    let totalTip=this.usedTips.length;
    let totalScore=0;
    let totalMistake=0;
    let totalMistakeCost=0,costPerMistake;

    let scorePerCorrectAnswer=this.hardLevel.index+1;              //перенести расчет этого в класс hardLevel

    this.hardLevel.gameLimits.forEach((item,i,arr)=>{
      scorePerCorrectAnswer=scorePerCorrectAnswer*item.gameHardScale;
    })
    costPerMistake=1.2*scorePerCorrectAnswer;         //ошибаться дорого

    this.gameStepResults.forEach((item,i,arr)=>{
      if(item.correctAnswer) totalScore+=scorePerCorrectAnswer;
      else{
        totalMistake++;
      }
    })

    totalScore=Math.round(totalScore-totalTip*(scorePerCorrectAnswer*0.3)-totalMistake*costPerMistake); //подсказки тоже чего-то стоят

    if(totalScore<0) totalScore=0;

    let resutlTextList=[];
   // resutlText.push('level_completed');
    resutlTextList.push({description:ItemDescription.getConstant('text_total_time').name,value:this.timeCounter.timePassed/1000});
    resutlTextList.push({description:ItemDescription.getConstant('text_used_tips_value').name,value:totalTip});
    resutlTextList.push({description:ItemDescription.getConstant('text_mistakes_value').name,value:totalMistake});
    resutlTextList.push({description:ItemDescription.getConstant('text_total_score').name,value:totalScore});

    this.modalService.createListDialog(resutlTextList,ItemDescription.getConstant('text_level_completed').name,
                                                      ItemDescription.getConstant('button_to_main_menu').name,()=>this.router.toMainPage());
  }
  private getCurrentGameItem() {
    if ((this.currentGameStepNumber == 0) || (this.currentGameStepNumber > this.gameStepItems.length)) return null;
    else return this.gameStepItems[this.currentGameStepNumber - 1];
  }

  //модальные окна сдесь не выводим, а только приостанавливаем игру
  private pauseGame() {

    //приостановим отсчет времени
    this.timeCounter.pause();

    //приостановим все ишговые ограниченя
    this.hardLevel.gameLimits.forEach((item, i, arr) => {
      item.pause();
    })

    //выкенем событие о паузе
    this.gamePaused.next(true)
  }
  private continueGame() {
    this.timeCounter.continue();

    //продолжим все ишговые ограниченя
    this.hardLevel.gameLimits.forEach((item, i, arr) => {
      item.continue();
    })

    //выкенем событие о окончании паузы
    this.gamePaused.next(false)
  }




}

class GameStepResult {
  gameStepNumber: number;
  correctAnswer: boolean;
  tipUsed: boolean = false;
  tipUsedTypes: string[] = [];
  gameItem: GameStepItem;

  useTip(tipName) {
    this.tipUsed = true;
    this.tipUsedTypes.push(tipName);
  }

}

export class GameLimitDescription {
  type: string;
  description: string;
  gameLimit: GameLimit;
}

abstract class GameLimit {

  static availableGameLimits:GameLimit[]=null;

  static getAvailableGameLimits():GameLimit[] {
    if(GameLimit.availableGameLimits!=null) return GameLimit.availableGameLimits;

    let result = [];

    let item = new GameLimitDescription();
    item.type = 'globalTime';
    item.description = 'ограничение по времени'
    item.gameLimit = new TimeGameLimit();
    item.gameLimit.valueToLimit = 150;
    item.gameLimit.initStateDescription();
    result.push(item.gameLimit);

    item = new GameLimitDescription();
    item.type = 'try';
    item.description = '3 попытки'
    item.gameLimit = new TryGameLimit();
    item.gameLimit.valueToLimit = 3;
    item.gameLimit.initStateDescription();
    result.push(item.gameLimit);

    GameLimit.availableGameLimits=result;
    return result;
  }

  static currentStateChange = new Subject<any>();
  static gameOver = new Subject<any>();

  constructor() {

  }

  stateDescription;
  valueToLimit;
  gameHardScale;          //коэффициент, умножаемый на количество очков

  selfDescription:ItemDescription;
  endDescription:ItemDescription;

  abstract processAnswer(answer: AnswerResult);
  abstract pause();
  abstract stop();
  abstract continue();
  abstract begin();

  abstract initStateDescription();

}
class TimeCounter {
  timePassed = 0;
  timeStep = 1000;  //здесь все в милисекундах
  private timeLimit = null;
  private pauseValue: boolean = false;
  private interval = null;

  currentStateChange = new Subject<any>();
  limitReached = null;// = new Subject<any>();

  begin(timeStep?, timeLimit?) {

    if (timeStep != null) this.timeStep = timeStep;

    if (timeLimit != null) {
      this.timeLimit = timeLimit;
      this.limitReached = new Subject<any>();
    }

    this.interval = setInterval(() => {
      if (!this.pauseValue) {
        this.timePassed = this.timePassed + this.timeStep;
        this.currentStateChange.next(this.timePassed);
      }
      if (this.timeLimit != null) {
        if (this.timePassed >= this.timeLimit) {
          
          this.stop();
          this.limitReached.next();

        }
      }
    }, this.timeStep)
  }
  stop() { clearInterval(this.interval) }
  pause() { this.pauseValue = true; }
  continue() { this.pauseValue = false; }
}

//ограничение по общему времени игры
class TimeGameLimit extends GameLimit {

  timePassed = 0;
  timeLeft = null;
  interval;
  baseTimeLimit = 60;     //нужно для расчета коэффициента трудности

  timeCounter = new TimeCounter();

  constructor() {
    super();
    this.selfDescription=ItemDescription.createItemDescription({name_ru:'',name_en:'',advice_ru:'осталось времени',advice_en:'time left'});
    this.endDescription=ItemDescription.createItemDescription({name_ru:'',name_en:'',advice_ru:'время вышло',advice_en:'time over'})

  }

  begin() {

    this.initStateDescription();
     //чтобы множитель сложности был больше 1.2
    let hardProposal = (this.baseTimeLimit / this.valueToLimit);
    if (hardProposal < 1.2) this.gameHardScale = 1.2
    else this.gameHardScale = hardProposal;

    this.timeCounter.begin(1000, this.valueToLimit * 1000);
    this.timeCounter.currentStateChange.asObservable().subscribe((timePassed) => {

    
      this.timePassed = timePassed / 1000;
      this.timeLeft = this.valueToLimit - this.timePassed;
      this.initStateDescription();
  console.log('time',this.timeLeft,this.stateDescription);
      GameLimit.currentStateChange.next();
    })
    this.timeCounter.limitReached.asObservable().subscribe(() => {
      GameLimit.gameOver.next(this.endDescription.advice);
    })


  }

  initStateDescription() {
    if (this.timeLeft == null) this.timeLeft = this.valueToLimit;
    this.stateDescription =this.selfDescription.advice+ ': ' + Math.floor(this.timeLeft / 60) + '.' + (this.timeLeft - Math.floor(this.timeLeft / 60) * 60);
  }

  pause() { this.timeCounter.pause() }
  stop() { this.timeCounter.stop() }
  continue() { this.timeCounter.continue() }

  processAnswer(answer: AnswerResult) {

  }
}

class TryGameLimit extends GameLimit {

  baseTryLimit = 3;

  constructor() {
    super();
    this.selfDescription=ItemDescription.createItemDescription({name_ru:'',name_en:'',advice_ru:'осталось попыток',advice_en:'tries left'});
    this.endDescription=ItemDescription.createItemDescription({name_ru:'',name_en:'',advice_ru:'попытки закончились',advice_en:'tries over'})
   
  }

  processAnswer(answer: AnswerResult) {
    if (!answer.correct) {
      this.valueToLimit--;
      this.initStateDescription();

      if (this.valueToLimit == 0) GameLimit.gameOver.next(this.endDescription.advice);
      else GameLimit.currentStateChange.next();
    }
  }

  initStateDescription() {
    this.stateDescription = this.selfDescription.advice+': ' + this.valueToLimit;
  }

  pause() { }
  stop() { }
  continue() { }
  begin() {
    this.initStateDescription();
     let hardProposal = (this.baseTryLimit / this.valueToLimit);
    if (hardProposal < 1.1) this.gameHardScale = 1.1
    else this.gameHardScale = hardProposal;
   }
}



