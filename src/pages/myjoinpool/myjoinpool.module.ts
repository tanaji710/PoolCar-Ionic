import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyjoinpoolPage } from './myjoinpool';

@NgModule({
  declarations: [
    MyjoinpoolPage,
  ],
  imports: [
    IonicPageModule.forChild(MyjoinpoolPage),
  ],
  exports: [MyjoinpoolPage]
})
export class MyjoinpoolPageModule {}
