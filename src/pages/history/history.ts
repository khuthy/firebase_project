import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
  
  presentPopover(){
    const popover = this.popoverCtrl.create(PopoverComponent);
    popover.present();
  }

}
