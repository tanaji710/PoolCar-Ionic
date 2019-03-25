import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {PoolCar} from "../../models/poolcar.interface";
import {MainPage} from "../index";
import {Profile} from "../../models/profile.interface";
import {Observable} from "rxjs";
import {WelcomePage} from "../welcome/welcome";
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * Generated class for the AddPoolCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-pool-car',
  templateUrl: 'add-pool-car.html',
})
export class AddPoolCarPage {

  pooCarDetails = { } as PoolCar;
  profileData1: Observable<any>;
  profileData: Profile;

  userid:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: HttpClient, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPoolCarPage');
  }

  addPoolCar() {
    const user = localStorage.getItem("userDetail");
    const  temp = {
      "UserId": user,
      "name": this.pooCarDetails.name,
      "carName": this.pooCarDetails.carName,
      "contact": this.pooCarDetails.contact,
      "to": this.pooCarDetails.to,
      "from": this.pooCarDetails.from,
      "date": this.pooCarDetails.date,
      "seats": this.pooCarDetails.seats,
      "time": this.pooCarDetails.time

  }
  console.log(temp);
    this.http.post('http://localhost:8080/api/poolcars/', temp).subscribe(data => {
      console.log(data);
      let toast = this.toastCtrl.create({
        message: 'Car Pool Added Successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.setRoot(MainPage);
      this.pooCarDetails = {} as PoolCar;
    }, error => {
      let toast = this.toastCtrl.create({
        message: 'There is something error please try again',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
