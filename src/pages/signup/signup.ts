import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import {ProfilePage} from "../profile/profile";
import {Profile} from "../../models/profile.interface";
import {HttpClient} from "@angular/common/http";
import {WelcomePage} from "../welcome/welcome";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account= { } as Profile;

  // Our translated text strings
  private signupErrorString: string;
  private datavalid: Profile[];

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService, private http:HttpClient) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

 async doSignup() {
    // Attempt to login in through our User service
   this.http.get('http://3.18.254.134:8080/api/users').subscribe(data=>{
     this.datavalid = <Profile[]>data;
     if(this.datavalid.findIndex(obj=>obj.email == this.account.email) < 0) {
       this.http.post('http://3.18.254.134:8080/api/users', this.account).subscribe(data => {
         const temp = <Profile> data;
         localStorage.setItem("userDetail", temp._id);
           sessionStorage.setItem("id", temp._id);
           let toast = this.toastCtrl.create({
             message: 'Register Succesful',
             duration: 3000,
             position: 'top'
           });
           toast.present();
           this.navCtrl.setRoot(MainPage);
         },
         error => {
           console.error(error);
           let toast = this.toastCtrl.create({
             message: 'Unable to Register please try again',
             duration: 3000,
             position: 'top'
           });
           toast.present();
         })
     }else {
       let toast = this.toastCtrl.create({
         message: 'Email Already present please login',
         duration: 3000,
         position: 'top'
       });
       toast.present();
       this.navCtrl.setRoot(WelcomePage);
     }
   });
  }
}
