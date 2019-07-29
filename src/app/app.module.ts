import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HotelPage } from '../pages/hotel/hotel';
import { VerifyemailPage } from '../pages/verifyemail/verifyemail';
import { RoomsPage } from '../pages/rooms/rooms';
import { HistoryPage } from '../pages/history/history';
import { ProfilePage } from '../pages/profile/profile';
import { PopoverComponent } from '../components/popover/popover';
import { AddHotelPage } from '../pages/add-hotel/add-hotel';
import { BookingPage } from '../pages/booking/booking';
import { ViewRoomsPage } from '../pages/view-rooms/view-rooms';
import { RoomBookingPage } from '../pages/room-booking/room-booking';
import { BookingFormPage } from '../pages/booking-form/booking-form';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    VerifyemailPage,
    HotelPage,
    RoomsPage,
    HistoryPage,
    ProfilePage,
    PopoverComponent,
    AddHotelPage,
    BookingPage,
    ViewRoomsPage,
    RoomBookingPage,
    BookingFormPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    VerifyemailPage,
    HotelPage,
    RoomsPage,
    HistoryPage,
    ProfilePage,
    PopoverComponent,
    AddHotelPage,
    BookingPage,
    ViewRoomsPage,
    RoomBookingPage,
    BookingFormPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
