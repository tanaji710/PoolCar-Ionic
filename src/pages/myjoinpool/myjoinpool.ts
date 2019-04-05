import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PoolCar} from "../../models/poolcar.interface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AddpoolcarInterface} from "../../models/addpoolcar.interface";

/**
 * Generated class for the MyjoinpoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myjoinpool',
  templateUrl: 'myjoinpool.html',
})
export class MyjoinpoolPage {
  poolcarData: AddpoolcarInterface[];
  pooldata: Array<AddpoolcarInterface> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyjoinpoolPage'+ localStorage.getItem('userDetails'));
    let params = new HttpParams().set('id', localStorage.getItem('userDetails'));
    this.http.get('http://18.204.58.241:8080/api/addpoolcars/', {params}).subscribe(data=>{
      this.poolcarData = <AddpoolcarInterface[]> data;
      this.poolcarData.forEach((item, index) => {
        if(item.UserId == localStorage.getItem('userDetail')){
          this.pooldata.push(item);
        }
      })
    });
  }

}
