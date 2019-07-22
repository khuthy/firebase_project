import { Component, Input } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { fetchHotels } from '../../app/displayData';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items;

  displayHotels = firebase.database().ref('hotels/');
  displayRooms =  firebase.database().ref('rooms/ ');
 
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController
    ) {
      
    }

    ionViewDidLoad() {
      var user = firebase.auth().currentUser;
      if(user) {
        this.displayHotels.on('value', resp => {
          this.items = fetchHotels(resp);
        })
      }else {
        
        this.navCtrl.setRoot(LoginPage)
      }
    }

  presentPopover(){
    const popover = this.popoverCtrl.create(PopoverComponent);
    popover.present();
  }
}
