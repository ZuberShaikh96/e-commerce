import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
	checkoutData;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.checkoutData=this.navParams.data;
  		console.log('Data inside Checkout' +JSON.stringify(this.checkoutData));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

}
