import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PoolCar} from "../../models/poolcar.interface";
import {AddpoolcarInterface} from "../../models/addpoolcar.interface";
import {Items} from "../../mocks/providers/items";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MainPage} from "../index";

/**
 * Generated class for the PoolcardetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poolcardetail',
  templateUrl: 'poolcardetail.html',
})
export class PoolcardetailPage {
  item: PoolCar;
  public  addpoolCar: AddpoolcarInterface[];
  constructor(public navCtrl: NavController, public navParams: NavParams, items: Items, private http: HttpClient) {
    this.item = navParams.get('item') || items.defaultItem;
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoolcardetailPage');
    let params = new HttpParams().set('id', this.item._id);
   this.http.get('http://3.18.254.134:8080/api/addpoolcars/', {params}).subscribe(data=>{
     this.addpoolCar = <AddpoolcarInterface[]> data;
     console.log(this.addpoolCar);
   })
  }

  accept(list: AddpoolcarInterface) {
    const url="http://3.18.254.134:8080/api/addpoolcars/";
    console.log('called'+list._id);
          this.http.put(url+list._id, {"status": 'accepted'}).subscribe(data=>{
            let temp = this.item.seats-1;
            let url ="http://3.18.254.134:8080/api/poolcars/"
            this.http.put(url+this.item._id, {"seats": temp}).subscribe(data1 =>{
              this.navCtrl.setRoot(MainPage);
              console.log(data);
            })
           })
  }
  reject(list: AddpoolcarInterface) {
    const url="http://3.18.254.134:8080/api/addpoolcars/";
    console.log('called'+list._id);
    this.http.put(url+list._id, {"status": 'rejected'}).subscribe(data=>{
      this.navCtrl.setRoot(MainPage);
      console.log(data);
    })
  }
}
