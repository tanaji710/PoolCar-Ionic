import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../../models/profile.interface";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  requesPassword() {
    if (this.email) {
      const temp = {
        "email" : this.email,
        "body": "",
        "subject": "CarPool password recovery mail"
      }
      this.http.post("http://3.18.254.134:8080/api/users/sendmail/", temp).subscribe(data=>{
        let toast = this.toastCtrl.create({
          message: "Password sent on your mail please check",
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.push(LoginPage);
      }, error1 => {
        let toast = this.toastCtrl.create({
          message: "invalid user id ",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      })
    }
  }
}
