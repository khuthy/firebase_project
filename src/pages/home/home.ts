import { Component, Input } from '@angular/core';
import { NavController, PopoverController, LoadingController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { fetchHotels } from '../../app/displayData';
import { BookingPage } from '../booking/booking';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items;

  displayHotels;

 
  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController
    ) {
      
    }

    ionViewDidLoad() {
      var user = firebase.auth().currentUser;
      if(user) {
        let loaders = this.loadingCtrl.create({
          content: 'Loading Hotel, Please wait...',
          duration: 3000
        })
        loaders.present()
        this.displayHotels = firebase.database().ref('rooms/');
        this.displayHotels.on('value', resp => {
         
          this.items = fetchHotels(resp);
          console.log(resp)
          
        })
      }else {
        
        this.navCtrl.setRoot(LoginPage)
      }
    }

  presentPopover(){
    const popover = this.popoverCtrl.create(PopoverComponent);
    popover.present();
  }

  book(key: any){
    this.navCtrl.push(BookingPage, key);
  }
}
