import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, HideWhen } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { VerifyemailPage } from '../verifyemail/verifyemail';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: any;

  user: any =  {
    email: '',
    password: '',
  }
 

  validation_messages = {
    'email': [
      {type: 'required', message: 'Email address is required.'},
      {type: 'pattern', message: 'Email address is not Valid.'},
      {type: 'validEmail', message: 'Email address already exists in the system.'},
    ],
    'password': [
     {type: 'required', message: 'Password is required.'},
     {type: 'minlength', message: 'password must be atleast 6 char or more.'},
     {type: 'maxlength', message: 'Password must be less than 8 char or less'},
   ]
 
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public forms: FormBuilder,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
    ) {

      this.registerForm = this.forms.group({
        email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]))
      
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signUp() {
    if(this.registerForm.valid) {

      let loaders = this.loading.create({
        duration: 2000,
        content: 'Please wait...',
        
    });

    let alert = this.alertCtrl.create({
       title: 'Registration',
       subTitle: 'Successfully Registered in the app',
       buttons: ['ok']
    });
    loaders.present();
    
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(result => {
        alert.present();
        this.navCtrl.push(VerifyemailPage);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    } else {
  console.log('error');
  
    }
    

  }
  login() {
    this.navCtrl.push(LoginPage);
  }

 
   

}
