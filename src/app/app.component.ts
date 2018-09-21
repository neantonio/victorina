import { Component } from '@angular/core';

import {MyRouterService} from './services/my-router.service'
import {LanguageService} from './services/language.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private languageService:LanguageService,private myRouter:MyRouterService){

  }

  onMainMenu(){
    this.myRouter.toMainPage();
  }

  
}
