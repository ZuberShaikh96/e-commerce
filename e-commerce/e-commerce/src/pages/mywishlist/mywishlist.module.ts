import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MywishlistPage } from './mywishlist';

@NgModule({
  declarations: [
    MywishlistPage,
  ],
  imports: [
    IonicPageModule.forChild(MywishlistPage),
  ],
})
export class MywishlistPageModule {}
