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
       this.userId = user.uid;
       console.log(user);
       
      this.displayRooms = firebase.database().ref('rooms/'+user.uid);
      this.displayRooms.on('value', resp => {
        this.lists = fetchHotels(resp);
        
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
    this.modalCtrl.create(RoomsPage).present();

  }

}
