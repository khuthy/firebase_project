import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import * as firebase from 'firebase';
import { fetchHotels } from '../../app/displayData';
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  history: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    var user = firebase.auth().currentUser;

    if(user) {
      var viewHistory = firebase.database().ref('booking/'+ user.uid);
      viewHistory.on('value', resp => {
        this.history = fetchHotels(resp);
      })
    }

  }
  
  presentPopover(){
    const popover = this.popoverCtrl.create(PopoverComponent);
    popover.present();
  }

  
}
