import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { fetchHotels } from '../../app/displayData';
import { BookingFormPage } from '../booking-form/booking-form';

/**
 * Generated class for the RoomBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-booking',
  templateUrl: 'room-booking.html',
})
export class RoomBookingPage {

  rooms: any;
  key: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.key = this.navParams.data;
    console.log(this.key);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomBookingPage');
    var user = firebase.auth().currentUser;
    if(user) {
      const Ref = firebase.database().ref();
       Ref.child('rooms').orderByKey().equalTo(this.key).on('value', (snap) => {
          this.rooms = fetchHotels(snap);
       })

    }

  }
  bookRoomNow(price) {
    this.navCtrl.push(BookingFormPage, {price: price, key: this.key});
  }

}
