import { Pipe, PipeTransform } from '@angular/core';

import {LanguageService} from '../services/language.service'

@Pipe({
  name: 'translate',
  pure:false
})
export class TranslatePipe implements PipeTransform {

  constructor(private languageService:LanguageService){

  }

  transform(value: any, args?: any): any {
    return this.languageService.translateWord(value);
  }

}
