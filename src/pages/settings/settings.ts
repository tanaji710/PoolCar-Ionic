import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import { Settings } from '../../providers';
import {WelcomePage} from "../welcome/welcome";
import {Profile} from "../../models/profile.interface";

import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MyjoinpoolPage} from "../myjoinpool/myjoinpool";
import {MycreatepoolPage} from "../mycreatepool/mycreatepool";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;
  userData: Profile[];
  userDetails: Profile;
  subSettings: any = SettingsPage;
  profileData: Observable<any>;
  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
             private http: HttpClient,
              private toast:ToastController) {
  }


  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    let params = new HttpParams().set('id', localStorage.getItem('userDetails'));
    this.http.get('http://localhost:8080/api/users/', {params}).subscribe(data=>{
      this.userData = <Profile[]> data;
      const count =this.userData.findIndex(obj => obj.email == localStorage.getItem('userDetail'))
     this.userDetails = this.userData[count];
    })
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }

  logout() {
    localStorage.clear();
    this.navCtrl.setRoot("WelcomePage");
  }

  openjoinpool() {
this.navCtrl.push(MyjoinpoolPage);
  }

  openmycreate() {
this.navCtrl.push(MycreatepoolPage);
  }
}
