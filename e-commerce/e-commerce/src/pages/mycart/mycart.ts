import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Device } from '@ionic-native/device';
import { CheckoutPage } from '../checkout/checkout';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-mycart',
  templateUrl: 'mycart.html',
})
export class MycartPage {

	cartItems;
  user_id;
  tot_price:number=0;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: RestProvider, private device:Device ,private toastCtrl:ToastController ) {
   this.user_id=this.navParams.get('id');
   this.viewCart();

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MycartPage');


  }

  viewCart(){

    console.log('user_id' +JSON.stringify(this.user_id));
    this.provider.viewCart(this.device.uuid,this.user_id)
      .subscribe(data=>{
         if(!data.result){
         this.cartItems = data;
         console.log('Data inside mycart viewCart' + JSON.stringify(this.cartItems));
          console.log('Cart Items Measurements '+this.cartItems[0].p_measurement);
       }
       else if (data.result=='no products in your cart')
       {
          let toast = this.toastCtrl.create({
            message: 'Nothing in your Cart',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.setRoot(ProfilePage);
       }
    },err=>{
      console.log('Error is'+ err );
    });


  }

  removeFromCart(item){

    let cart_item={p_id:item.p_id,user_id:item.user_id,device_id:this.device.uuid,s_id:item.s_id}
    console.log('item is' +JSON.stringify(cart_item));
     this.provider.removeFromCart(item).subscribe(data => {
      console.log(' Data inside Add to cart is '+JSON.stringify(data));
      if(data.result == 'success'){
        let toast = this.toastCtrl.create({
          message: 'Product deleted from cart',
          duration: 2000,
          position: 'bottom'
        });toast.present();
       this.viewCart();
      } else{
        let toast = this.toastCtrl.create({
          message: 'Unable to deleted product from cart',
          duration: 2000,
          position: 'bottom'
        }); toast.present();
      }
    },error => {
      console.log("Error inside removeFromCart is"+JSON.stringify(error));
    });
  }  


  gotoCheckout(){
   
   for(let i=0;i<this.cartItems.length;i++){
        /*console.log(this.cart[i].price * this.cart[i].quantity);*/
        this.tot_price = this.tot_price + this.cartItems[i].p_sellPrice * this.cartItems[i].p_quantity;
      }

      console.log('Cart Price'+this.tot_price);
    this.navCtrl.push(CheckoutPage ,this.cartItems);

  }

}
