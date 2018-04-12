import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Device } from '@ionic-native/device';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-favstore',
  templateUrl: 'favstore.html',
})
export class FavstorePage {

	user_id;
	favStore;
	removeStore;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider:RestProvider , private device: Device,private toastCtrl:ToastController) {
  	this.user_id=this.navParams.get('id');
  	console.log('Data is:'+JSON.stringify(this.user_id));
  	this.getFavStore();

  }


  getFavStore(){
    this.provider.getFavStore(this.user_id,this.device.uuid).subscribe(data=>{
      console.log(JSON.stringify(data))
      if(!data.result){
        this.favStore = data;
        console.log('Data inside getFavStore' + JSON.stringify(this.favStore));   
      }else if (data.result =='no favourite shops'){

        let toast = this.toastCtrl.create({
          message: 'Nothing in favourite store',
          duration: 2000,
          position: 'bottom'
        });toast.present();
        this.navCtrl.setRoot(ProfilePage);
      }
    });
  }

  removeFavStore(data){
   	this.removeStore={user_id:this.user_id,device_id:this.device.uuid,s_id:data}
   	console.log('Shop id is ' +this.favStore.s_id);
   	this.provider.addFavStore(this.removeStore).subscribe(data => {
      if(data.result =='shop removed') {
        let toast = this.toastCtrl.create({
          message: 'Shop removed from Favourite',
          duration: 2000,
          position: 'bottom'
        });toast.present();
        this.getFavStore();
      }
      else{
        let toast = this.toastCtrl.create({
          message: 'Unable to remove shop as favourite',
          duration: 2000,
          position: 'bottom'
        });toast.present();
      }
    }, // success path
    error => {
      console.log("Error inside Wishlist is"+JSON.stringify(error));
    }); // error path
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavstorePage');
  }

}
