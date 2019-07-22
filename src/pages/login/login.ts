import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 loginForm: FormGroup;
 user = {
   email: '',
   password: ''
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
    public alertCtrl: AlertController,
    public loading: LoadingController
    ) {

      this.loginForm = this.forms.group({
        email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]))
      
      })

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    if(this.loginForm.valid) {

      let loaders = this.loading.create({
        duration: 2000,
        content: 'Please wait...',
        
    });

    let alert = this.alertCtrl.create({
       title: 'Login',
       subTitle: 'Successfully Logged in the app',
       buttons: ['ok']
    });
    loaders.present();

    
    
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(result => {
        
          alert.present();
        this.navCtrl.setRoot(HomePage);
        
        
      }).catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        let errors = this.alertCtrl.create({
          title: errorCode,
          subTitle: errorMessage,
          buttons: ['Try Again']
        })
        errors.present();
        // ...
      });
    }else {
      let errors = this.alertCtrl.create({
        title: 'Type Something',
        subTitle: 'Fields can\'t be empty',
        buttons: ['Try Again']
      })
      errors.present();
    }
  }
  loginWithGoogle() {

  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
