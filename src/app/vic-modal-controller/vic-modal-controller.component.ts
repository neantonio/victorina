import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {ModalDialogService} from '../services/modal-dialog.service'
import {VicTextDialogComponent} from '../vic-text-dialog/vic-text-dialog.component'

//все дергают ModalDialogService, а этот компанент принимает события от сервиса и создает модальное окно

@Component({
  selector: 'vic-modal-controller',
  templateUrl: './vic-modal-controller.component.html',
  styleUrls: ['./vic-modal-controller.component.css']
})
export class VicModalControllerComponent implements OnInit {

  constructor(private dialogService:ModalDialogService,public dialog: MatDialog) {
    this.dialogService.getDialogObservable().subscribe((data)=>{
      this.createDialog(data);
    })
   }

  ngOnInit() {
  }

  private createDialog(dialogData){
    console.log(dialogData);
    this.dialog.open(VicTextDialogComponent,dialogData);
  }

}
