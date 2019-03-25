import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoolcardetailPage } from './poolcardetail';

@NgModule({
  declarations: [
    PoolcardetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PoolcardetailPage),
  ],
  exports: [PoolcardetailPage]
})
export class PoolcardetailPageModule {}
