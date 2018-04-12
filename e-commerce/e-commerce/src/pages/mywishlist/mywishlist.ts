import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { RestProvider } from '../../providers/rest/rest';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-mywishlist',
  templateUrl: 'mywishlist.html',
})

export class MywishlistPage {

  user_id;
  wishlistItems;
  removeitem;

  constructor(public navCtrl: NavController, public navParams: NavParams , private device:Device, public provider:RestProvider ,public toastCtrl:ToastController) {
  	this.user_id=this.navParams.get('id');
  	this.viewMyWishlist();

  }

  viewMyWishlist(){

    this.provider.viewWishlist(this.device.uuid,this.user_id).subscribe(data=>{
       console.log(JSON.stringify(data))
       if(!data.result){
         this.wishlistItems = data;
            console.log('Data inside my wishlist' + JSON.stringify(this.wishlistItems));
          console.log('Data results'+data.result);
       }

       else if (data.result =='no products in your wishlist')
       {
          let toast = this.toastCtrl.create({
                  message: 'Nothing in wishlist',
                  duration: 2000,
                  position: 'bottom'
                });toast.present();
              this.navCtrl.setRoot(ProfilePage);
       }
    });


  }

  removeFromWishlist(item){
  	this.removeitem={p_id:item.p_id, device_id:this.device.uuid, u_id:this.user_id,s_id:item.s_id }
    console.log('Data remove '+JSON.stringify(this.removeitem));
  	this.provider.addToWishlist(this.removeitem)
        .subscribe(
            data => {
            console.log('Data inside Add to wishlist '+JSON.stringify(data));
           if(data.result =='product removed') {

              let toast = this.toastCtrl.create({
                  message: 'Product deleted from wishlist',
                  duration: 3000,
                  position: 'bottom'


                });toast.present();
              
              this.viewMyWishlist();

            }

             else{

                let toast = this.toastCtrl.create({
                  message: 'Unable to add product into wishlist',
                  duration: 3000,
                  position: 'bottom'


                });toast.present();

              }
            }, // success path
          error => {
            console.log("Error inside Wishlist is"+JSON.stringify(error));
          }); // error path




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MywishlistPage');
  }

}
