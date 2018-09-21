import { Injectable } from '@angular/core';

//получает карты языков для перевода интерфейса 
//выдает компонентам значение текущего языка , чтобы они скорректировали контент

export class LanguageDescription {
  key: string;
  description: string;
}

var rootWordMap = {
  wordMap_ru: {
    begin_game: 'начать игру',
    easy: 'легко',
    medium: 'средне',
    hard: 'сложно',
    tips: 'подсказки',
    pause: 'пауза',
    to_main_menu: 'в главное меню',
    how_play: 'как играть?',
    level_completed: 'уровень завершен',
    total_time: 'общее время',
    used_tips_value: 'использовано подсказок',
    mistakes_value: 'количество ошибок',
    total_score: 'общий счет',
    game_over: 'игра окончена',
    time_left: 'осталось времени',
    tries: 'попытки',
    hard_level:'уровень сложности',
    game_field_size:'размер игрового поля',
    close:'закрыть'
  },
  wordMap_en: {
    begin_game: 'begin game',
    easy: 'easy',
    medium: 'medium',
    hard: 'hard',
    tips: 'tips',
    pause: 'pause',
    to_main_menu: 'to main menu',
    how_play: 'how to play?',
    level_completed: 'level completed',
    total_time: 'time',
    used_tips_value: 'tips used',
    mistakes_value: 'mistakes made',
    total_score: 'score',
    game_over: 'game over',
    time_left: 'time left',
    tries: 'tries',
    hard_level:'hard level',
    game_field_size:'game field size',
    close:'close'
  }
}

@Injectable()
export class LanguageService {

  constructor() {
    this.selectedLanguageValue = this.availableLanguages[1];
    this.wordMap = rootWordMap.wordMap_ru;
  }

  wordMap;

  availableLanguages: LanguageDescription[] = [{ key: 'en', description: 'English' }, { key: 'ru', description: 'Русский' }]
  selectedLanguageValue: LanguageDescription;

  get selectedLanguage() {
    return this.selectedLanguageValue;
  }
  set selectedLanguage(value) {
    this.selectedLanguageValue = value;
    this.wordMap=rootWordMap['wordMap_'+this.selectedLanguageValue.key];
  }

  getAvailableLanguages(): LanguageDescription[] {
    return this.availableLanguages;
  }
  setLanguage(value) {

  }
  translateWord(word) {
    let result = this.wordMap[word];
    if (typeof result == 'undefined') return word;
    else return result;
  }

  getCurrentLanguageKey(){
    return this.selectedLanguageValue.key;
  }

}
