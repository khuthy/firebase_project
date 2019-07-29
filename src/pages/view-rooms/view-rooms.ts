import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { fetchHotels } from '../../app/displayData';
import { LoginPage } from '../login/login';
import { RoomsPage } from '../rooms/rooms';


/**
 * Generated class for the ViewRoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-rooms',
  templateUrl: 'view-rooms.html',
})
export class ViewRoomsPage {
  key: any;
  listOfRooms: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
    ) {
    this.key = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRoomsPage');
    var user = firebase.auth().currentUser;
    if(user) {
        console.log('lOgeged in');
       
        const Ref = firebase.database().ref();
        
        Ref.child('rooms').orderByChild('hotelKey').equalTo(this.key).on('value', (resp) => {
          if(resp.exists()) {
            this.listOfRooms =  fetchHotels(resp);
          }else {
            console.log('no data to show');
            

          }
          
        })
        
    }else {
      this.navCtrl.setRoot(LoginPage)
    }
  }

  modalRoom() {
    this.modalCtrl.create(RoomsPage, {key: this.key}).present();

  }

}
