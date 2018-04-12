import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {


	data;data1;data2;data3;
	Two;
	Three;
	Four;
	sliderImages;
	public selectedProduct;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.selectedProduct =this.navParams.get('item');
  	console.log('Data is : ' +JSON.stringify(this.selectedProduct));
  	this.sliderImages=JSON.parse(this.selectedProduct.p_sliderImages); 
  	console.log('Slider Images: ' +JSON.stringify(this.sliderImages));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
  }

  showDetails(id){

  	console.log('Id is :' +id);

  	if(id ==='one') {

  		let d={name: 'Data'}
  		this.data=this.selectedProduct.p_measurement;
  		this.data1 = null;this.data2=null;this.data3=null;
  		console.log('Data is ' +this.data);

  	}
  	else if(id ==='two'){
  		let d={ data:'Delevery within 36hrs'}
  		this.data1=d;
  		console.log('Data is ' +this.data1);
  		this.data = null;this.data2=null;this.data3=null;

  	}

  	else if(id ==='three'){
  		let d={ name:'Data2'}
  		this.data=d;
  		console.log('Data is ' +this.data);

  	}

  	else if(id ==='four'){
  		let d={ name:'Data3'}
  		this.data=d;
  		console.log('Data is ' +this.data);

  	}
  }


}
