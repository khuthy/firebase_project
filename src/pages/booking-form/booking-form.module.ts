import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingFormPage } from './booking-form';

@NgModule({
  declarations: [
    BookingFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingFormPage),
  ],
})
export class BookingFormPageModule {}
