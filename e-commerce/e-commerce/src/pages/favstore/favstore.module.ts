import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavstorePage } from './favstore';

@NgModule({
  declarations: [
    FavstorePage,
  ],
  imports: [
    IonicPageModule.forChild(FavstorePage),
  ],
})
export class FavstorePageModule {}
