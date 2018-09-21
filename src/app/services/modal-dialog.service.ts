import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

//работает в паре с vic-modal-controller и vic-text-dialog
//этот сервис дергают все, он излучает событие, а vic-modal-controller создает модальное окно

export interface IDialogItemDescription{
  type:string;
  textValue:string;
  value?:any
  clickCallback?;
  closeDialogOnClick?;
}

export interface IDialogItemGroup{
  items:IDialogItemDescription[];
  align?:string;
  direction?:string;
  width?:string;
  height?:string;
}

export interface IListDescription{
  description:string;
  value:string;
}

@Injectable()
export class ModalDialogService {

  constructor() { }

  createTextDialog(text){
    if(Array.isArray(text)){
        let dialogStruct=[];
        text.forEach((item,i,arr)=>{
          dialogStruct.push( {items: [{type:'text',textValue:item}]})
        })
        dialogStruct.push({items: [ {type:'button',textValue:'close',closeDialogOnClick:true}]})

        this.createCustomDialog({data:dialogStruct});

    }
    else{
        this.createCustomDialog({data:[
                            {items: [{type:'text',textValue:text}]},
                            {items: [{type:'button',textValue:'close',closeDialogOnClick:true}]}
                           ]});
    }
    
  }

  createListDialog(listDescription:IListDescription[],header:string,closeButtonText:string,closeButtonCallBack){
    let dialogStruct=[];
      dialogStruct.push( {items: [{type:'text',textValue:header,}],align:'center',direction:'row',width:'300px'})

    listDescription.forEach((item,i,arr)=>{
      dialogStruct.push({items: [{type:'text',textValue:item.description},{type:'text',textValue:item.value}],align:'space-between',direction:'row'})
    })

    dialogStruct.push({items: [{type:'button',textValue:closeButtonText,closeDialogOnClick:true,clickCallback:closeButtonCallBack}],align:'center'})

    this.createCustomDialog({data:dialogStruct,disableClose: true});

  }

  createCustomDialog(dialogStruct){
    this.createDialog.next(dialogStruct);
  }


  createActionDialog(text:string,buttonText:string,buttonCallBack){
   this.createCustomDialog({data:[
                            {items: [{type:'text',textValue:text}]},
                            {items: [{type:'button',textValue:buttonText,clickCallback:buttonCallBack, closeDialogOnClick:true}]}
                           ],disableClose: true});
  }

  private createDialog = new Subject<any>();

  getDialogObservable(){
    return this.createDialog.asObservable();
  }

}
