import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';

/**
 * Generated class for the VerifyemailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifyemail',
  templateUrl: 'verifyemail.html',
})
export class VerifyemailPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public loading: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyemailPage');
  }

  verifyemail() {
    console.log('verify works!');
    let loaders = this.loading.create({
      duration: 2000,
      content: 'Please wait...',
      
  });

  loaders.present();
  
    let alert = this.alertCtrl.create({
          title: 'Email Verification',
          subTitle: 'Check your Email for verifications.',
          buttons: ['Ok']
    });

    var user = firebase.auth().currentUser;

user.sendEmailVerification().then(() => {
  alert.present();
  this.navCtrl.setRoot(HomePage);
}).catch(function(error) {
  // An error happened.
});
    
  }
  skip() {
    this.navCtrl.setRoot(HomePage);
  }


}
