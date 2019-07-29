import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import * as firebase from 'firebase';
import { PopoverComponent } from '../../components/popover/popover';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AddHotelPage } from '../add-hotel/add-hotel';
import { fetchHotels } from '../../app/displayData';
import { RoomsPage } from '../rooms/rooms';
import { empty } from 'rxjs/Observer';
import { ViewRoomsPage } from '../view-rooms/view-rooms';

/**
 * Generated class for the HotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html',
})
export class HotelPage {


  userId: any;
  displayRooms: any;
  lists: any;
  notFound: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
    ) {

     
  }

  ionViewDidLoad() {
   
     var user = firebase.auth().currentUser;
     if(user) {
      
     //console.log(user.uid);
     
       
      let ref = firebase.database().ref().child('hotels');
      ref.orderByChild('userUid').equalTo(user.uid).on('value', (snap) => {
        if(snap.exists()) {
         this.lists = fetchHotels(snap); 
        }else{
          this.notFound = "You have no Hotels Added Yet";
        }
        
      })
     }else {
        this.navCtrl.setRoot(LoginPage);
     }
  }

  presentPopover(){
    const popover = this.popoverCtrl.create(PopoverComponent);
    popover.present();
  }

  modalHotel() {
    this.modalCtrl.create(AddHotelPage).present();

  }

  addRoom(key) {
    this.navCtrl.push(ViewRoomsPage, key)

  }

}
