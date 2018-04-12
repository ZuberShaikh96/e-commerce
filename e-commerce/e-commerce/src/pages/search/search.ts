import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar} from 'ionic-angular'; //Keyboard

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
@ViewChild(Searchbar) input:Searchbar;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	/*this.search.setFocus();*/
  }

  ionViewWillEnter() {
    /*setTimeout(()=>{this.input.setFocus();},500)*/
/*    setInterval(()=>{
      this.input.setFocus();
      
    },150);*/
      //this.input.setFocus();
      //this.input.setFocus();
    
    /*this.kb.show();*/

  }
  ngOnInit(){
    setTimeout(()=>{this.input.setFocus();},500)
  }

/*  ionViewDidEnter(){
	this.kb.show();  	
  }*/
}
