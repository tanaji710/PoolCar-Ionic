import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Observable} from "rxjs";
import {PoolCar} from "../../models/poolcar.interface";
import {Item} from "../../models/item";
import {Profile} from "../../models/profile.interface";
import {HttpClient} from "@angular/common/http";
import {AddpoolcarInterface} from "../../models/addpoolcar.interface";
/**
 * Generated class for the SearchPoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-pool',
  templateUrl: 'search-pool.html',
})
export class SearchPoolPage {
  pooCarDetails = { } as PoolCar;
  poolcarData: PoolCar[];
  poolcars:  Array<PoolCar> = [];
  cars:Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.http.get('http://3.18.254.134:8080/api/poolcars').subscribe(data=>{
      this.poolcarData = <PoolCar[]> data;
      console.log(this.poolcarData);
    })
  }
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
  search(){
    this.poolcars = [];
    this.poolcarData.forEach((item1, index) => {
      if(item1.from == this.pooCarDetails.from){
        if(item1.to == this.pooCarDetails.to){
          this.poolcars.push(item1);
        }
      }
    })
    console.log(this.poolcars);
  }

}
