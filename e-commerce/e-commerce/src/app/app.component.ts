import { Component, enableProdMode } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppState } from './app.global';

import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';

enableProdMode();

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  counter = 0;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public global: AppState, public toastCtrl: ToastController) {

    firebase.initializeApp({
      apiKey: "AIzaSyCrXXcnFZyOHi8f2P6qntDqzCX-PFEfbpQ",
      authDomain: "ibuddi-662be.firebaseapp.com",
      databaseURL: "https://ibuddi-662be.firebaseio.com",
      projectId: "ibuddi-662be",
      storageBucket: "ibuddi-662be.appspot.com",
      messagingSenderId: "223194861213"

    });




    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
/*      platform.registerBackButtonAction(()=>{
        if(this.counter == 0){
          this.counter++;
          this.presentToast();
          setTimeout(()=>{this.counter = 0},3000)
        }else{
          platform.exitApp();
        }
      },0);*/

    });
  }
  presentToast(){
    let toast = this.toastCtrl.create({
      message:"Press again to exit",
      duration: 3000,
      position:"bottom"
    });
    toast.present();
  }
}


/*

    firebase.initializeApp({
      apiKey: "AIzaSyCrXXcnFZyOHi8f2P6qntDqzCX-PFEfbpQ",
      authDomain: "ibuddi-662be.firebaseapp.com",
      databaseURL: "https://ibuddi-662be.firebaseio.com",
      projectId: "ibuddi-662be",
      storageBucket: "ibuddi-662be.appspot.com",
      messagingSenderId: "223194861213"

    });

*/