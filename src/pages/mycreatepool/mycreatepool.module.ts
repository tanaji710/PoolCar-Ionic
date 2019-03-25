import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycreatepoolPage } from './mycreatepool';

@NgModule({
  declarations: [
    MycreatepoolPage,
  ],
  imports: [
    IonicPageModule.forChild(MycreatepoolPage),
  ],
  exports:[MycreatepoolPage]
})
export class MycreatepoolPageModule {}
