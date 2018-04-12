import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationsProvider } from '../../providers/locations/locations';
import { DetailsPage } from '../details/details';
import { MapPage } from '../map/map';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { LoadingController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  public location;
  private loading:any;
  constructor(public navCtrl: NavController, private diagnostic: Diagnostic,public navParams: NavParams, public locations :LocationsProvider ,private locationAccuracy:LocationAccuracy, private loadingCtrl:LoadingController) {

  }

locationcheck() {
  this.loading = this.loadingCtrl.create({
       content: 'Please wait...'
    });
     this.loading.present();
  /*alert("check location  is CALLED:");*/
  this.diagnostic.isLocationEnabled().then(
      (isAvailable) => {
        if(!isAvailable){
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                () =>{
                    this.location = JSON.stringify(this.locations.load());
                    this.loading.dismiss();
                    },
               error => alert('Error requesting location permissions'+ error)
            );  
        }
        else
          {

            this.location = JSON.stringify(this.locations.load()); 
            this.loading.dismiss(); 
            // alert('location already enable ');
          }
        }).catch( e => {
          console.log(e);
          alert('Enable location ' + JSON.stringify(e));
      });
   }
  ionViewWillEnter() {
     this.locationcheck();

     /*development purpose. Remove or comment when deploying or building to device*/
     this.location = JSON.stringify(this.locations.load());
     this.loading.dismiss();
    console.log('ionViewDidLoad ListPage');
    console.log(this.location);
  }

  itemTapped(event, item){
      this.navCtrl.push(DetailsPage, {
        item: item
      });
    }
    opnMap(){
      this.navCtrl.push(MapPage);
    }
}
