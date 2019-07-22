import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, LoadingController} from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';
import { fetchHotels } from '../../app/displayData';
/**
 * Generated class for the RoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {
 
  roomtype: string;
  roomprice: string;
  hotel: string;
  userId: any;
  items: any = [];
  displayHotels = firebase.database().ref('hotels/');
  captureDataUrl: string;
  roomForm: FormGroup;

  validation_messages = {
    'roomtype': [{type: 'required', message: 'Room type is required.'}],
    'hotel': [{type: 'required', message: 'Room type is required.'}],
    'roomprice':  [{type: 'required', message: 'Price is required.'}]
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public forms: FormBuilder,
    private camera: Camera
    ) {
      this.roomForm = this.forms.group({
        roomtype: new FormControl('', Validators.required),
        hotel: new FormControl('', Validators.required),
        roomprice: new FormControl('', Validators.required)
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomsPage');
    var user = firebase.auth().currentUser;
    if(user) {
      this.userId = user.uid;
      this.displayHotels.on('value', resp => {
        this.items = fetchHotels(resp);
      })
    }else {
       this.navCtrl.setRoot(LoginPage);
    }
  }

  presentPopover(){
    const popover = this.popoverCtrl.create(PopoverComponent);
    popover.present();
  }


  takePhoto(sourcetype: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: sourcetype,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 500,
      targetWidth: 500
    }
    
    this.camera.getPicture(options).then((captureDataUrl) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let imageUploaded = 'data:image/jpeg;base64,' + captureDataUrl;
     
     this.captureDataUrl = imageUploaded;
     
    }, (err) => {
     // Handle error
    });
  }
  

}
