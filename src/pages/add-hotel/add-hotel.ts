import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import * as firebase from 'firebase';
import { Validators, FormBuilder, FormGroup, FormControl, FormArrayName } from '@angular/forms';
import { LoginPage } from '../login/login';
/**
 * Generated class for the AddHotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-hotel',
  templateUrl: 'add-hotel.html',
})
export class AddHotelPage {

  public captureDataUrl: string;
 

  hotelForm: FormGroup;

  hotel = {
    hotelname: '',
    location: '',
    contact: null,
    description: ''
  }
 
  validation_messages = {
    'hotel': [
      {type: 'required', message: 'Email address is required.'}
    ],
    'contact': [
     {type: 'required', message: 'contact is required.'},
     {type: 'minlength', message: 'contact must be atleast 10 numbers'},
     {type: 'maxlength', message: 'contact must be less than 12 with country Code'}
   ],
   'location':  [
    {type: 'required', message: 'Location is required.'}
  ],
  'description':  [
    {type: 'required', message: 'Description is required.'}
  ],

 
  }

  @Input('useURI') useURI: boolean = true;

  
  userId: any;
  addHotels: any;
  items: any;
  url: string;

  publicHotel = firebase.database().ref('public-hotel/');

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private camera: Camera,
    public forms: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
      this.hotelForm = this.forms.group({
        name: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)]))
      
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddHotelPage');
    var user = firebase.auth().currentUser;
     if(user) {
       this.userId = user.uid;
       console.log(user);
       
       this.addHotels = firebase.database().ref('hotels/'+this.userId);
     }else {
        this.navCtrl.setRoot(LoginPage);
     }
  }

  close(){
    this.viewCtrl.dismiss();
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
    })
    let storageRef = firebase.storage().ref();

    const filename = Math.floor(Date.now() / 1000);

    const imageRef = storageRef.child(`my-hotel/${filename}.jpg`);
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
    })
  }

  createHotel() {
    let alert = this.alertCtrl.create({
      title: 'adding a Hotel',
      subTitle: 'successfully added!',
      buttons: ['Ok']
    })
   if(this.url != '') {
     let newHotel = this.addHotels.push();
     newHotel.set({
     hotelName: this.hotel.hotelname,
     Location: this.hotel.location,
     Description: this.hotel.description,
     Contact: this.hotel.contact,
     image: this.captureDataUrl
   });

   let publicHotel = this.publicHotel.push();
   publicHotel.set({
     hotelName: this.hotel.hotelname,
     Location: this.hotel.location,
     Description: this.hotel.description,
     image: this.captureDataUrl
   })

    this.hotel.hotelname = '';
    this.hotel.location = '';
    this.hotel.description = '';
    this.hotel.contact = '';
    this.captureDataUrl = '';
     alert.present();

   }else {
    let alert = this.alertCtrl.create({
      title: 'Warning!',
      subTitle: 'Upload image first.',
      buttons: ['Ok']
    }).present();
   }
   
   
  }

}
