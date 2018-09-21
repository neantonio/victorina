import { Injectable } from '@angular/core';

import {MyRouterService} from './my-router.service'
import { ModalDialogService } from './modal-dialog.service'

import { ItemDescription} from './content-provider.service'

@Injectable()
export class RotGameProcessService {

  constructor(private router:MyRouterService,private modalService: ModalDialogService) { }

  horValue;
  vertValue;

  onGameFinish(){
    this.modalService.createListDialog([],ItemDescription.getConstant('text_level_completed').name,
                                                      ItemDescription.getConstant('button_to_main_menu').name,()=>this.router.toMainPage());
  }

}
