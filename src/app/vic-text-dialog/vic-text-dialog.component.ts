import { Component, OnInit,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {IDialogItemDescription,IDialogItemGroup} from '../services/modal-dialog.service'

@Component({
  selector: 'app-vic-text-dialog',
  templateUrl: './vic-text-dialog.component.html',
  styleUrls: ['./vic-text-dialog.component.css']
})
export class VicTextDialogComponent implements OnInit {

 
  itemGroups:IDialogItemGroup[];

  constructor(private dialogRef: MatDialogRef<VicTextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
      this.itemGroups=data;
      
     }

  ngOnInit() {
  }

  onItemClick(item:IDialogItemDescription){
    if(item.clickCallback!=null) item.clickCallback();
    if(item.closeDialogOnClick) this.dialogRef.close();
  }

  

}
