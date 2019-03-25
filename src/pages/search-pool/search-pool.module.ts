import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPoolPage } from './search-pool';

@NgModule({
  declarations: [
    SearchPoolPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPoolPage),
  ],
})
export class SearchPoolPageModule {}
