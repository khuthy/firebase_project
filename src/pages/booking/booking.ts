import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'; 
import { LoginPage } from '../login/login';
import { fetchHotels } from '../../app/displayData';
import { HistoryPage } from '../history/history';
/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
booking = {

  checkin: null,
  checkout: null,
  adults: null,
  children: null,
 
}


  USER_UID: any;
  createBooking: any;
  KEY: any;
  seeMore: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
    var user = firebase.auth().currentUser;
    console.log(this.booking.checkin);
    

    if(user) {
      this.USER_UID = user.uid;
      this.createBooking = firebase.database().ref('booking/'+ this.USER_UID);
     
      
    }else {
      console.log('please login First');
      this.navCtrl.setRoot(LoginPage)
    }
  }
  

  createBook(){
    var price = this.navParams.data;
     var total = price*(this.booking.children+this.booking.adults)

    let book = this.createBooking.push();
    book.set({
      Total: total,
      CheckIn: this.booking.checkin,
      Checkout: this.booking.checkout,
      Adults: this.booking.adults,
      Children: this.booking.children
    })
    this.navCtrl.setRoot(HistoryPage);
  }

}
