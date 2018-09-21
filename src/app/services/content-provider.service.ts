import { Injectable } from '@angular/core';

import {LanguageService} from './language.service'



@Injectable()
export class ContentProviderService {

  constructor(private languageService:LanguageService) { 
    ItemDescription.languageService=languageService;

    let constantMap={
      tip_light: ItemDescription. createItemDescription({name_en:'light',advice_en:'turn the light on',name_ru:'свет',advice_ru:'включить свет'}),
      tip_rotation:  ItemDescription. createItemDescription({name_en:'camera rotation',advice_en:'rotate camera manualy',name_ru:'вращение камеры',advice_ru:'вращать камеру в ручную'}),
      tip_axis:ItemDescription. createItemDescription({name_en:'axis',advice_en:'add rotation axis',name_ru:'ось вращения',advice_ru:'добавить ось вращения'}),
      tip_advice: ItemDescription. createItemDescription({name_en:'advice',advice_en:'show advice',name_ru:'подсказка',advice_ru:'показать подсказку'}),
      
      hard_level_easy:ItemDescription.createItemDescription({name_en:'easy',advice_en:'',name_ru:'легко',advice_ru:''}),
      hard_level_medium:ItemDescription.createItemDescription({name_en:'medium',advice_en:'',name_ru:'средне',advice_ru:''}),
      hard_level_hard:ItemDescription.createItemDescription({name_en:'hard',advice_en:'',name_ru:'сложно',advice_ru:''}),
      
      button_pause: ItemDescription.createItemDescription({name_en:'pause',advice_en:'continue',name_ru:'пауза',advice_ru:'продолжить'}),
      button_to_main_menu: ItemDescription.createItemDescription({name_en:'to main menu',advice_en:'',name_ru:'в главное меню',advice_ru:''}),
      
      text_total_time: ItemDescription.createItemDescription({name_en:'total time',advice_en:'',name_ru:'общее время',advice_ru:''}),
      text_used_tips_value: ItemDescription.createItemDescription({name_en:'used tips value',advice_en:'',name_ru:'использовано подсказок',advice_ru:''}),
      text_mistakes_value: ItemDescription.createItemDescription({name_en:'mistakes value',advice_en:'',name_ru:'совершено ошибок',advice_ru:''}),
      text_total_score: ItemDescription.createItemDescription({name_en:'total score',advice_en:'',name_ru:'заработано очков',advice_ru:''}),
      text_level_completed: ItemDescription.createItemDescription({name_en:'level completed',advice_en:'',name_ru:'уровень завершен',advice_ru:''}),

      description_quiz: ItemDescription.createItemDescription({name_en:'Quize',advice_en:'The screen shows the silhouette of the object. You need to guess this item',
                                                              name_ru:'Викторина',advice_ru:'На экране показан силуэт предмета. Вам необходимо отгадать этот предмет.'}),
      description_rotate: ItemDescription.createItemDescription({name_en:'Rotate the picture',advice_en:'The original picture is divided into rectangles. These rectangles are rotated randomly. Rotate these rectangles until the picture is restored.',
                                                              name_ru:'Переверни картинку',advice_ru:'Исходная картинка разбивается на прямоугольники. Эти прямоугольники поворачиваются случайным образом. Вращайте эти прямоугольники, пока картинка не восстановится.'}),
    }

    ItemDescription.constantMap=constantMap;
  }

  getRandomItems(value: number): GameStepItem[] {

    let resultArr = [];
    let result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/cameraTV/';
    result.sceneObject.name = 'cameraTV'
    result.sceneObject.scale = 0.8;

    let hardVariants = new TextVariants();
    let medVariants = new TextVariants();
    let eVariants = new TextVariants();

    eVariants.variants = ['топор', 'лодка', 'видеокамера', 'паровоз'];
    eVariants.indexOfCorrect = 2;
    eVariants.suggestion = 'этот предмет умеет летать'

    medVariants.variants = ['фотоаппарат', 'проф. видеокамера', 'фонарь', 'телескоп'];
    medVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'этот предмет делает качественные видеозаписи'

    hardVariants.variants = ['камера panasonic', 'камера samsung', 'камера sony', 'камера lg'];
    hardVariants.indexOfCorrect = 0;
    eVariants.suggestion = 'этот предмет производится в Японии'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/';
    result.sceneObject.name = 'spider'
    result.sceneObject.scale = 70;

    hardVariants = new TextVariants();
    medVariants = new TextVariants();
    eVariants = new TextVariants();

    eVariants.variants = ['утюг', 'вишня', 'часы', 'паук'];
    eVariants.indexOfCorrect = 3;
    eVariants.suggestion = 'этот предмет живой'

    medVariants.variants = ['муравей', 'паук', 'гусеница', 'жук'];
    medVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'этото существо плетет паутину'

    hardVariants.variants = ['птицеяд', 'тарантул', 'сенокосец', 'еще паук'];
    hardVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'этот паук очень ядоитый'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/';
    result.sceneObject.name = 'dodge1971'
    result.sceneObject.scale = 1.5;

    hardVariants = new TextVariants();
    medVariants = new TextVariants();
    eVariants = new TextVariants();

    eVariants.variants = ['утюг', 'автомобиль', 'дом', 'штанга'];
    eVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'этот предмет перемещается'

    medVariants.variants = ['легковой автомобиль', 'грузовик', 'автобус', 'фургон'];
    medVariants.indexOfCorrect = 0;
    eVariants.suggestion = 'этот предмет перевозит пару человек и небольшой багаж'

    hardVariants.variants = ['Dodge Challenger 1971', 'Ford Mustang 1969', 'Лада Гранта', 'RenoDuster'];
    hardVariants.indexOfCorrect = 0;
    eVariants.suggestion = 'на эмблеме этого автомобиля изображен баран'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/';
    result.sceneObject.name = 'uh60'
    result.sceneObject.scale = 2;

    hardVariants = new TextVariants();
    medVariants = new TextVariants();
    eVariants = new TextVariants();

    eVariants.variants = ['вертолет', 'колесница', 'ключ', 'принтер'];
    eVariants.indexOfCorrect = 0;
    eVariants.suggestion = 'этот предмет летает'

    medVariants.variants = ['вертолет', 'самолет', 'катер', 'автожир'];
    medVariants.indexOfCorrect = 0;
    eVariants.suggestion = 'этото транспортное средство может зависать в воздухе'

    hardVariants.variants = ['Ми-24Д', 'UH-60 Blackhawk', 'McDonnell Douglas AH-64', 'Ка-52 Аллигатор'];
    hardVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'это транспортно-боевой американский вертолет'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/ak74/';
    result.sceneObject.name = 'ak74'
    result.sceneObject.scale = 1;

    hardVariants = new TextVariants();
    medVariants = new TextVariants();
    eVariants = new TextVariants();

    eVariants.variants = ['автомат', 'ручка', 'фонарь', 'книга'];
    eVariants.indexOfCorrect = 0;
    eVariants.suggestion = 'этот предмет стреляет'

    medVariants.variants = ['винтовка', 'автомат', 'пистолет', 'пулемет'];
    medVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'это оружие сделано под винтовочный патрон и стрелят очередями'

    hardVariants.variants = ['АК-74', 'M16', 'СВД', 'РПК'];
    hardVariants.indexOfCorrect = 0;
    eVariants.suggestion = 'это основное оружие российской армии'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/desertEagle/';
    result.sceneObject.name = 'desertEagle'
    result.sceneObject.scale = 1.4;

    hardVariants = new TextVariants();
    medVariants = new TextVariants();
    eVariants = new TextVariants();

    eVariants.variants = ['птица', 'циркуль', 'кружка', 'пистолет'];
    eVariants.indexOfCorrect = 3;
    eVariants.suggestion = 'этот предмет стреляет'

    medVariants.variants = ['винтовка', 'пистолет', 'пулемет', 'автомат'];
    medVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'это оружие возмоно использовать одной рукой'

    hardVariants.variants = ['Наган', 'Пистолет Стечкина', 'Desert Eagle', 'Пистолет Макарова'];
    hardVariants.indexOfCorrect = 2;
    eVariants.suggestion = 'это основное оружие российской армии'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/f18/';
    result.sceneObject.name = 'f18'
    result.sceneObject.scale = 1;

    hardVariants = new TextVariants();
    medVariants = new TextVariants();
    eVariants = new TextVariants();

    eVariants.variants = ['лодка', 'самолет', 'курица', 'лампа'];
    eVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'этот предмет летает и стреляет'

    medVariants.variants = ['истребитель', 'пассажирский авиалайнер', 'самолет-амфибия', 'космический челнок'];
    medVariants.indexOfCorrect = 0;
    eVariants.suggestion = 'это самолтет боевой'

    hardVariants.variants = ['Ил-2', 'F15C', 'Су-27', 'F18'];
    hardVariants.indexOfCorrect = 2;
    eVariants.suggestion = 'это американский легкий многофункциональный истребитель'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/is3/';
    result.sceneObject.name = 'is3'
    result.sceneObject.scale = 1.4;

    hardVariants = new TextVariants();
    medVariants = new TextVariants();
    eVariants = new TextVariants();

    eVariants.variants = ['фотоаппарат', 'окно', 'танк', 'ложка'];
    eVariants.indexOfCorrect = 2;
    eVariants.suggestion = 'этот предмет стреляет'

    medVariants.variants = ['сау', 'бмп', 'бтр', 'танк'];
    medVariants.indexOfCorrect = 3;
    eVariants.suggestion = 'это бронетехника, созданная для прорыва вражеской обороны'

    hardVariants.variants = ['Тигр', 'Шерман', 'Ис-3', 'Т-34'];
    hardVariants.indexOfCorrect = 2;
    eVariants.suggestion = 'этот советский танк создавался во аремя великой отечественной войны, но в боевых действиях не успел принять участие'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/mig-15/';
    result.sceneObject.name = 'mig-15'
    result.sceneObject.scale = 4;

    hardVariants = new TextVariants();
    medVariants = new TextVariants();
    eVariants = new TextVariants();

    eVariants.variants = ['фломастер', 'самолет', 'ящерица', 'пинцет'];
    eVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'этот предмет летает'

    medVariants.variants = ['легкоматорный самолет', 'бомбардировщик', 'истребитель', 'пассажирский авиалайнер'];
    medVariants.indexOfCorrect = 2;
    eVariants.suggestion = 'это боевой самолет для завоевания превосходства в воздухе'

    hardVariants.variants = ['Як-38', 'Су-24', 'МиГ-15', 'Су-7'];
    hardVariants.indexOfCorrect = 2;
    eVariants.suggestion = 'этот самолет разработан в кб Микояна и Гуревича'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    result = new GameStepItem();
    result.sceneObject = new SceneObject();
    result.sceneObject.path = 'assets/public/models/p90/';
    result.sceneObject.name = 'p90'
    result.sceneObject.scale = 1.2;

    hardVariants = new TextVariants();
    medVariants = new TextVariants();
    eVariants = new TextVariants();

    eVariants.variants = ['автомат', 'телефон', 'монета', 'батарейка'];
    eVariants.indexOfCorrect = 0;
    eVariants.suggestion = 'этот предмет стреляет'

    medVariants.variants = ['гранатомет', 'пистолет-пулемет', 'шткрмовая винтовка', 'пулемет'];
    medVariants.indexOfCorrect = 1;
    eVariants.suggestion = 'это оружие применяется при полицейских операциях'

    hardVariants.variants = ['РПК', 'Usi', 'P90', 'ППШ'];
    hardVariants.indexOfCorrect = 2;
    eVariants.suggestion = 'этот пистолет-пулемет разработан в Бельгии'

    result.variantsForLevels = [eVariants, medVariants, hardVariants];

    resultArr.push(result);

    return resultArr.splice(0,value);
  }


}

export class SceneObject {
  path: string;
  name: string;
  scale: number = 1;
}


export class GameStepItem {
  sceneObject;
  variantsForLevels: TextVariants[];

  getVariantForHardLevel(hardLevel: number) {
    if (hardLevel >= this.variantsForLevels.length) return this.variantsForLevels[this.variantsForLevels.length - 1];
    else return this.variantsForLevels[hardLevel];
  }

}

export class TextVariants {
  variants: string[];
  indexOfCorrect;
  suggestion: string;
}

export class ItemDescription {
  private data;
  static constantMap;

  static languageService:LanguageService;
  static createItemDescription(data):ItemDescription{
    let result=new  ItemDescription();
    result.data=data;
    return result;
  }

 static getConstant(constantName):ItemDescription{
    let result=ItemDescription.constantMap[constantName];
    if(typeof result == 'undefined') return constantName;
    else return result;
  }

  get name(){
    let result =this.data['name_'+ItemDescription.languageService.getCurrentLanguageKey()];
    if(typeof result=='undefined') return '';
    else return result;
  }
  get advice(){
    let result =this.data['advice_'+ItemDescription.languageService.getCurrentLanguageKey()];
    if(typeof result=='undefined') return '';
    else return result;
  }

}

class ContentCategory {
  childCategories: ContentCategory[];
  description: ItemDescription;
  id: number;

  getChildCategory(categoryId): ContentCategory {
    let result = null;
    this.childCategories.forEach((item, i, arr) => {
      if (item.id == categoryId) result = item;
    })
    return null;
  }
  getRandomVariantsFromChildCategories(variantsValue) {
    let shuffled = this.childCategories.slice(0), i = this.childCategories.length, temp, index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, variantsValue);
  }

  //минимальный targetLevel 1. т.к у руткатегории он =ноль.

  getCategoryByLevel(categoryIds: number[], currentLevel, targetLevel): ContentCategory {
    if (currentLevel == targetLevel) return this;           // у руткатегории нулевой уровень
    else return this.getChildCategory(categoryIds[currentLevel]).getCategoryByLevel(categoryIds, currentLevel + 1, targetLevel)
  }
}

class ContentObject {
  static rootCategory: ContentCategory;
  description: ItemDescription;
  id: number;
  categoryIds: number[];       //массив длиной с общую глубину категорй. если конкретезировать объект не получается, то дополняется нулами до этой длины


  getLastAppropriateCategoryLevel() {             //не все объекты смогут попасть в самые конкретные категории, в этом методе находим самую конкретную
    let result = null;
    this.categoryIds.forEach((item, i, arr) => {
      if (item != null) result = i;
    })
    return result;
  }

  getDescriptionForCategoryLevel(categoryLevel): ItemDescription {
    if (this.getLastAppropriateCategoryLevel() == this.categoryIds.length - 1) return this.description;      // на последнем уровне конкретизации описание берется из самого объекта
    else return ContentObject.rootCategory.getCategoryByLevel(this.categoryIds, 0, categoryLevel).description;
  }

  getVariants(categoryLevel, variantsValue) {
    //нужно получить категорию на один уровень выше и уже у нее спросить варианты
    return ContentObject.rootCategory.getCategoryByLevel(this.categoryIds, 0, categoryLevel - 1).getRandomVariantsFromChildCategories(variantsValue);

  }

}
