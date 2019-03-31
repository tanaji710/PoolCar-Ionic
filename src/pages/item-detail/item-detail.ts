import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import { Items } from '../../providers';
import {PoolCar} from "../../models/poolcar.interface";
import {AddpoolcarInterface} from "../../models/addpoolcar.interface";
import {HttpClient} from "@angular/common/http";
import {MainPage} from "../index";

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: PoolCar;
  addpoolCar ={} as AddpoolcarInterface;
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, private http: HttpClient, private toastCtrl: ToastController) {
    this.item = navParams.get('item') || items.defaultItem;
console.log(this.item);
  }
  request(){
    const temp = {
      "addharNo": this.addpoolCar.addharNo,
    "name": this.addpoolCar.name,
    "contact": this.addpoolCar.contact,
    "poolId": this.item._id,
    "UserId": localStorage.getItem('userDetail'),
    "accepted": false,
      "rejected": false,
      "pickupPoint": this.addpoolCar.pickupPoint,
      "status": ""
    }
  console.log(temp);
    this.http.post('http://3.18.254.134:8080/api/addpoolcars/', temp).subscribe(data=>{
      let toast = this.toastCtrl.create({
        message: 'Car Pool Added Successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.setRoot(MainPage);
    }, error1 => {
      let toast = this.toastCtrl.create({
        message: error1,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    })
  }

}
