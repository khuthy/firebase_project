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

  items: any[];

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
          duration: 300
        })
        loaders.present()
      
        
         let val = firebase.database().ref().child('hotels/')
        val.on('value', (snap) => {
          if(snap.exists()) {
            this.items = fetchHotels(snap); 
          }else {
            console.log('no data to display');
            
          }
          
        }) 
      }else {
        
        this.navCtrl.setRoot(LoginPage)
      }
    }
  

  presentPopover(){
    const popover = this.popoverCtrl.create(PopoverComponent);
    popover.present();
  }

  viewHotel(key: any){
    this.navCtrl.push(BookingPage, key);
  }
}
