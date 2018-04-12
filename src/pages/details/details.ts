import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController, Content} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { ProductdetailsPage } from '../productdetails/productdetails';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
   @ViewChild(Slides) slides: Slides;
   @ViewChild(Content) content: Content;
  
	public selectedItem;
  public itemClicked;
  public items;
  public userProfile;
  sliderImage;
  q1;
  categories:any=[];
  products:any=[];
  pmeasurement1:any=[];
  img:any=[]; merge:any=[];
  device_id; flag:boolean =true;
  catName;
  

  constructor(public navCtrl: NavController, public navParams: NavParams ,private callNumber: CallNumber ,private launchNavigator: LaunchNavigator ,private geolocation: Geolocation,public provider:RestProvider, private storage:Storage, private device:Device, public toastCtrl:ToastController) {
    this.selectedItem = navParams.get('item');
    console.log('this.selectedItem.s_sliderImages is '+this.selectedItem.s_imageUrl);
    this.sliderImage = JSON.parse(this.selectedItem.s_sliderImages);
  }

  ionViewWillEnter(){
    this.storage.get('userProfile').then((data)=>{
      this.userProfile = data;
      console.log('UserProfile storage'+JSON.stringify(this.userProfile));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    //console.log('Selected Item'+JSON.stringify(this.selectedItem));
    console.log(this.selectedItem.category.length);

  }

  addToCart(item){
    let cartItems={p_id:item.p_id, p_name:item.p_name, p_quantity:++item.p_quantity, s_id:this.selectedItem.s_id, device_id:this.device.uuid, u_id:this.userProfile.id}
    this.provider.addToCart(cartItems).subscribe(data => {
      console.log('Data inside Add to cart is '+JSON.stringify(data));
      if(data.result == 'success'){
        let toast = this.toastCtrl.create({
          message: 'Added to cart successfully',
          duration: 2000,
          position: 'bottom'
        }); toast.present();
      }else{
        let toast = this.toastCtrl.create({
          message: 'Out of Stock',
          duration: 2000,
          position: 'bottom'
        });toast.present();
      }
    },error => {
      console.log("Error inside Addtocart is"+JSON.stringify(error));
    });
  }

  addToWishlist(item){
    let wishlistItems={p_id:item.p_id, s_id:this.selectedItem.s_id, device_id:this.device.uuid, u_id:this.userProfile.id}
    this.provider.addToWishlist(wishlistItems).subscribe( data => {
      console.log('Data inside Add to wishlist '+JSON.stringify(data));
      if(data.result == 'success'){
        let toast = this.toastCtrl.create({
          message: 'Added to wishlist',
          duration: 2000,
          position: 'bottom'
        });toast.present();
      } else if(data.result =='product removed') {
        let toast = this.toastCtrl.create({
          message: 'Remove from wishlist',
          duration: 2000,
          position: 'bottom'
        });toast.present();
      } else{
        let toast = this.toastCtrl.create({
          message: 'Unable to add product into wishlist',
          duration: 2000,
          position: 'bottom'
        });toast.present();
      }
    }, error => {
      console.log("Error inside Wishlist is"+JSON.stringify(error));
    });
  }

  addFavStore(){
    let fav_store={ user_id:this.userProfile.id , device_id:this.device.uuid , s_id:this.selectedItem.s_id }  
    this.provider.addFavStore(fav_store).subscribe(data => {
      console.log('Data inside Add to fav store '+JSON.stringify(data.result));
      if(data.result == 'success'){
        let toast = this.toastCtrl.create({
          message: 'Store added as favourite',
          duration: 2000,
          position: 'bottom'
        });toast.present();
      }else if(data.result =='shop removed') {
        let toast = this.toastCtrl.create({
          message: 'Shop removed from Favourite',
          duration: 2000,
          position: 'bottom'
        });toast.present();
      }else{
        let toast = this.toastCtrl.create({
          message: 'Unable to add shop as favourite',
          duration: 2000,
          position: 'bottom'
        });toast.present();
      }
    },error => {
      console.log("Error inside Wishlist is"+JSON.stringify(error));
    });
  }

  removeFromCart(item){
    --item.p_quantity;
    let r_item = {p_id:item.p_id ,s_id:this.selectedItem.s_id,device_id:this.device.uuid, user_id:this.userProfile.id}
    this.provider.removeFromCart(r_item).subscribe(data => {
      console.log(' Data inside Add to cart is '+JSON.stringify(data));
      if(data.result == 'success'){
        let toast = this.toastCtrl.create({
          message: 'Removed from cart',
          duration: 2000,
          position: 'bottom'
        });toast.present();
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
   
  showDirection() {
      console.log('latitude '+this.selectedItem.s_latitude);
      console.log('lngitude '+this.selectedItem.s_longitude);
      this.geolocation.getCurrentPosition().then((resp) => {
         let dest= [this.selectedItem.s_latitude, this.selectedItem.s_longitude];
         let options: LaunchNavigatorOptions = {
           start: ""
        };
        this.launchNavigator.navigate(dest, options)
          .then(
          success => console.log('Launched navigator'),
          error => alert('Error launching navigator'+ error)
          );
        }).catch((error) => {
          alert('Error getting location'+ error);
      });
  }

  dialer() {
    this.callNumber.callNumber(this.selectedItem.s_contact, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  gotoProductDetails(item){
    this.navCtrl.push(ProductdetailsPage ,{item:item})
  }

  getProducts(item){
    this.content.scrollTo(0,350);
    //console.log('ITEM'+JSON.stringify(item));
    this.catName = item.categoryName;
    this.items = item;
    this.products = item.products;
    //console.log('PRODUCTS'+JSON.stringify(this.products));

  }

  changeSlide(){
    this.flag = true;
  }
}
