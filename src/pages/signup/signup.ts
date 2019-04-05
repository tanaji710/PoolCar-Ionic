import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import {ProfilePage} from "../profile/profile";
import {Profile} from "../../models/profile.interface";
import {HttpClient} from "@angular/common/http";
import {WelcomePage} from "../welcome/welcome";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validator} from "@angular/forms";

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
  signup: FormGroup;
  // Our translated text strings
  private signupErrorString: string;
  private datavalid: Profile[];

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService, private http:HttpClient,
              private formBuilder: FormBuilder) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
    this.signup = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['',[ Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      contact: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

 async doSignup() {
    // Attempt to login in through our User service
   if(!this.signup.get('email').valid){
     let toast = this.toastCtrl.create({
       message: 'Enter valid email',
       duration: 3000,
       position: 'top'
     });
     toast.present();
   }
   if(!this.signup.get('password').valid){
     let toast = this.toastCtrl.create({
       message: 'Enter valid password min 6 character',
       duration: 3000,
       position: 'top'
     });
     toast.present();
   }
   if(this.signup.valid) {
     this.http.get('http://18.204.58.241:8080/api/users').subscribe(data => {
       this.datavalid = <Profile[]>data;
       if (this.datavalid.findIndex(obj => obj.email == this.account.email) < 0) {
         this.http.post('http://18.204.58.241:8080/api/users', this.account).subscribe(data => {
             const temp = <Profile>data;
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
       } else {
         let toast = this.toastCtrl.create({
           message: 'Email Already present please login',
           duration: 3000,
           position: 'top'
         });
         toast.present();
         this.navCtrl.setRoot(WelcomePage);
       }
     });
   }else {
     let toast = this.toastCtrl.create({
       message: 'All Fields are required with proper data',
       duration: 3000,
       position: 'top'
     });
     toast.present();
   }
  }
}
