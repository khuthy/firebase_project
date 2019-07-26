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
  description: string;

  addRooms: any;
  url: any;
  publicRooms: any;

  userId: any;
  items: any = [];
  displayHotels = firebase.database().ref('rooms/');
  captureDataUrl: string;
  roomForm: FormGroup;

  validation_messages = {
    'roomtype': [{type: 'required', message: 'Room type is required.'}],
    'description': [{type: 'required', message: 'Description is required.'}],
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
        description: new FormControl('', Validators.required),
        roomprice: new FormControl('', Validators.required)
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomsPage');
    var user = firebase.auth().currentUser;
    if(user) {
      this.addRooms = firebase.database().ref('rooms/'+user.uid);
      this.publicRooms = firebase.database().ref('rooms/')
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

  upload() {
    let loaders = this.loadingCtrl.create({
      content: 'Uploading, Please wait...',
      duration: 3000
    });
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`my-rooms/${filename}.jpg`);
    loaders.present()
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
    .then((snapshot) => {
      console.log('image uploaded');
      this.url = snapshot.downloadURL
      let alert = this.alertCtrl.create({
        title: 'Image Upload', 
        subTitle: 'Image Uploaded to firebase',
        buttons: ['Ok']
      }).present();
    });
  }

  createRooms() {
    
    let alertSuccess = this.alertCtrl.create({
      title: 'adding a Room',
      subTitle: 'Room successfully added!',
      buttons: ['Ok']
    })
  
    this.upload();
     let newRooms = this.addRooms.push();
      newRooms.set({
        RoomType: this.roomtype,
        Price: this.roomprice,
        Description: this.description,
        image: this.captureDataUrl
   });
   let publicRooms = this.publicRooms.push();
   publicRooms.set({
    RoomType: this.roomtype,
    Price: this.roomprice,
    Description: this.description,
    image: this.captureDataUrl
   })
    alertSuccess.present();
    this.roomprice = null;
    this.roomtype = '';
    this.description = '';
    this.navCtrl.pop();
   
  }
  

}
