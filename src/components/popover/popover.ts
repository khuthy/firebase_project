import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ProfilePage } from '../../pages/profile/profile';
import { HistoryPage } from '../../pages/history/history';
import { HotelPage } from '../../pages/hotel/hotel';
import { RoomsPage } from '../../pages/rooms/rooms';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import * as firebase from 'firebase';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
  }

  home() {
    this.navCtrl.push(HomePage);
    this.close();
  }

  profile () {
    this.navCtrl.push(ProfilePage);
    this.close();
  }
  signout () {
    firebase.auth().signOut().then(() => {
      console.log('logged Out');
      this.close();
       this.navCtrl.setRoot(LoginPage);
    }).catch(function(error) {
      // An error happened.
    });
    
  }
  history () {
    this.navCtrl.push(HistoryPage);
    this.close();
  }

  hotels () {
    this.navCtrl.push(HotelPage);
    this.close();
  }
  rooms () {
    this.navCtrl.push(RoomsPage);
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }



}
