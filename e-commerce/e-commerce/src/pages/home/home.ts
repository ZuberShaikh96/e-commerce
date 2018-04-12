import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { SearchPage } from '../search/search';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
 	splash = true;
 	sliderImg;
  constructor(public navCtrl: NavController,private provider:RestProvider) { 

  }
  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
    this.getImages();
  }
  opnPage(){
  	this.navCtrl.push(SearchPage);
  }

  getImages(){
    this.provider.homeSlider()
    .subscribe(data=>{
      console.log(data[0].homeImage);
    this.sliderImg=JSON.parse(data[0].homeImage);
     //console.log('sliderImg '+JSON.stringify(this.sliderImg.homeImage));
     console.log(this.sliderImg);
    })
  }

}
