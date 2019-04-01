import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';


import { User } from '../../providers';
import { MainPage } from '../';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../../models/profile.interface";
import {ItemInterface} from "../../models/dataMessage";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  login:FormGroup;
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
   public dataValidate: Profile[];
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
              private http: HttpClient, private formBuilder: FormBuilder) {
    this.login = this.formBuilder.group({
      email: ['',[ Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  async doLogin() {
    if(!this.login.get('email').valid){
      let toast = this.toastCtrl.create({
        message: 'Enter valid email',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    if(!this.login.get('password').valid){
      let toast = this.toastCtrl.create({
        message: 'Enter valid password min 6 character',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    if(this.login.valid) {
      this.http.post('http://3.18.254.134:8080/api/users/login/', this.account).subscribe(data => {
        console.log(Object.keys(data).length);
        const temp = <ItemInterface>data;
        if (!temp.message) {
          this.dataValidate = <Profile[]>data;
          const id = this.dataValidate[0]._id;
          console.log(id)
          localStorage.setItem("userDetail", id);
          console.log(id + localStorage.getItem('userDetail'));
          let toast = this.toastCtrl.create({
            message: "Login Successful",
            duration: 3000,
            position: 'top'
          });
          toast.present();
          console.log(data);
          this.navCtrl.setRoot(MainPage);
        } else {
          let toast = this.toastCtrl.create({
            message: "invalid username or password",
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
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

  gotoForgot() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}
