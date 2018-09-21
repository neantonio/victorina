import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { VicBeginScreenComponent } from './vic-begin-screen/vic-begin-screen.component';
import { VicGameScreenComponent } from './vic-game-screen/vic-game-screen.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import { TranslatePipe } from './pipes/translate.pipe'
import { Pipe, PipeTransform } from '@angular/core';
import { VicSceneComponent } from './vic-scene/vic-scene.component';

import {GameProcessService} from './services/game-process.service'
import {ContentProviderService} from './services/content-provider.service';
import {ModalDialogService} from './services/modal-dialog.service';
import {LanguageService} from './services/language.service'
import {MyRouterService} from './services/my-router.service'

import {RotGameProcessService} from './services/rot-game-process.service'

import { AuthService } from './services/auth.service';

import { VicTextDialogComponent } from './vic-text-dialog/vic-text-dialog.component'
import {VicModalControllerComponent} from './vic-modal-controller/vic-modal-controller.component';
import { RotMainScreenComponent } from './rot-main-screen/rot-main-screen.component'

const appRoutes: Routes = [
  { path: 'game', component: VicGameScreenComponent },
   { path: 'rotate', component: RotMainScreenComponent },
  { path: '**', component: VicBeginScreenComponent },
  

];



@NgModule({
  declarations: [
    AppComponent,
   
    VicBeginScreenComponent,
    VicGameScreenComponent,

    TranslatePipe,

   
    VicTextDialogComponent,
    VicSceneComponent,
    VicModalControllerComponent,
    RotMainScreenComponent

  ],
  entryComponents: [
    
    VicTextDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }), // <-- debugging purposes only

    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule
  ],
  providers: [GameProcessService,ContentProviderService,ModalDialogService,LanguageService,MyRouterService,RotGameProcessService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
