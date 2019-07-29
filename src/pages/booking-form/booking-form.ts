import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
/**
 * Generated class for the BookingFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-form',
  templateUrl: 'booking-form.html',
})
export class BookingFormPage {

  booking = {
    checkin: null,
    checkout: null,
    adults: null,
    children: null,
    rooms: '',
    meals: null
  }

  key: any;
  priceGrand: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public forms: FormBuilder
    ) {
    this.key = this.navParams.get('key');
    this.priceGrand = this.navParams.get('price');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingFormPage');
  }

  bookRoomNow() {

    let alert = this.alertCtrl.create()

     let difference = this.booking.checkout - this.booking.checkin;
     this.priceGrand *= (difference + (this.booking.adults+this.booking.children+ this.booking.meals));

    const Ref = firebase.database().ref();
    const saveBooking = Ref.child('booking');
    let newData = saveBooking.push();
    newData.set({
        price: this.priceGrand,
        checkin: this.booking.checkin,
        checkout: this.booking.checkout,
        children: this.booking.children,
        meals: this.booking.meals,
    })
  }

}
