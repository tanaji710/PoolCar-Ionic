import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Item} from "../../models/item";
import {PoolCar} from "../../models/poolcar.interface";
import {HttpClient, HttpParams} from "@angular/common/http";

/**
 * Generated class for the MycreatepoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mycreatepool',
  templateUrl: 'mycreatepool.html',
})
export class MycreatepoolPage {
  poolcarData: PoolCar[];
  pooldata: Array<PoolCar> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    let params = new HttpParams().set('id', localStorage.getItem('userDetails'));
    console.log('ionViewDidLoad MycreatepoolPage');
this.http.get('http://18.204.58.241:8080/api/poolcars/',{params}).subscribe(data=>{
    this.poolcarData = <PoolCar[]> data;
  this.poolcarData.forEach((item, index) => {
    if(item.UserId == localStorage.getItem('userDetail')){
      this.pooldata.push(item);
    }

  })
  console.log(this.pooldata);

})
  }
  openItem(item: Item) {
    this.navCtrl.push('PoolcardetailPage', {
      item: item
    });
  }
}
