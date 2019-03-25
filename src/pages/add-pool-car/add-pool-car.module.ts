import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPoolCarPage } from './add-pool-car';

@NgModule({
  declarations: [
    AddPoolCarPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPoolCarPage),
  ],
  exports: [AddPoolCarPage]
})
export class AddPoolCarPageModule {}
