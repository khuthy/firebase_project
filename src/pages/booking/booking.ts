import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'; 
import { LoginPage } from '../login/login';
import { fetchHotels } from '../../app/displayData';
import { HistoryPage } from '../history/history';
import { RoomBookingPage } from '../room-booking/room-booking';
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

 notFound: string = '';
  
  hotels: any;
  KEY: any;
  rooms: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.KEY = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
    var user = firebase.auth().currentUser;
    console.log(this.booking.checkin);
    

    if(user) {
     
      const Ref = firebase.database().ref();
      Ref.child('hotels').orderByKey().equalTo(this.KEY).on('value', (hotel) => {
        
        if(hotel.exists()){
          this.hotels = fetchHotels(hotel)
        }else {
          this.notFound = "Sorry!. There are not rooms for you in this hotel. Please Contact the Adminstrator Above if you have any Concern.";
        } 
            

      })

      Ref.child('rooms').orderByChild('hotelKey').equalTo(this.KEY).on('value', (room) => {
        this.rooms = fetchHotels(room)   
      })

     
      
    }else {
      console.log('please login First');
      this.navCtrl.setRoot(LoginPage)
    }
  }

  bookNow(roomKey) {
    this.navCtrl.push(RoomBookingPage, roomKey);
  }

  goBack() {
    this.navCtrl.pop();
  }
  



}
