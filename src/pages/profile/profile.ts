import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AppState } from '../../app/app.global';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { OnInit } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { MycartPage } from '../mycart/mycart';
import { MywishlistPage } from '../mywishlist/mywishlist';
import { FavstorePage } from '../favstore/favstore';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook'

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  isLoggedIn:boolean = false;
  users:any;
  userProfile: any = null;
  user;zone: NgZone;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: AppState, public provider:RestProvider, public storage:Storage, private device:Device, private googlePlus: GooglePlus, private facebook:Facebook) {
    this.getStorage();
    this.checkLoggedIn();


    //this.fbLoginStatus();
  }

  getStorage(){
    this.storage.get('userProfile').then(data=>{

      this.userProfile = data;
     
    }).catch(err=>{
        alert('Error is '+err);
    });   
  }

  checkLoggedIn(){
    this.zone = new NgZone({});
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
      } else { 
        this.userProfile = null; 
      }
    },err=>{
      alert('constructor'+err);
    });  
  }

  ngOnInit() {
    
    this.user = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pswd: new FormControl('', [Validators.required, Validators.maxLength(10)])
    
    });

  }

  login(){
  	this.provider.login(this.user.value)
    .subscribe(
      data => {
        console.log('user data is'+ JSON.stringify(data.userdata));
        if(data.result == "true"){
          if(data.userdata.roleId === "3"){
            this.userProfile = {id:data.userdata.user_id, name:data.userdata.name, picture:data.userdata.imageUrl, email:data.userdata.email, provider:'ibuddi', role:'admin'}    
            this.storage.set('userProfile',this.userProfile);
            console.log('userProfile' +JSON.stringify(this.userProfile));
          }
          else if(data.userdata.roleId === "4"){
            this.userProfile = {id:data.userdata.user_id, name:data.userdata.name, picture:data.userdata.imageUrl, email:data.userdata.email,provider:'ibuddi', role:'seller'}
            this.storage.set('userProfile',this.userProfile);
          }
          else if(data.userdata.roleId === "5"){                
            this.userProfile = {id:data.userdata.user_id, name:data.userdata.name, picture:data.userdata.imageUrl, email:data.userdata.email, provider:'ibuddi', role:'user'}
            this.storage.set('userProfile',this.userProfile);
          }
        }
        else{
          alert(data.message);
          console.log('Role Id'+data.userdata);
        }
      },error => {
        console.log("Error is"+JSON.stringify(error));
    }); // error path
  }

  openSignup(){
    this.navCtrl.push(SignupPage);
  }

  gotoMyCart(){
    this.navCtrl.push(MycartPage, {id:this.userProfile.id});
  }

  gotoCart(){
    this.navCtrl.push(MycartPage, {id:this.device.uuid}); 
  }

  gotoMywishlist(){
    this.navCtrl.push(MywishlistPage ,{id:this.userProfile.id} );
  }

  gotoMyFavStore(){
    this.navCtrl.push(FavstorePage ,{id:this.userProfile.id});
  }

  changeTheme(theme) {
    this.global.set('theme', theme);
  }

  logout(){
    if(this.userProfile.provider=='facebook'){
      this.facebook.logout().then( res => {
        this.isLoggedIn = false;
        this.storage.remove('userProfile');
        this.navCtrl.setRoot(ProfilePage);
      }).catch( e => {
        this.storage.remove('userProfile');
        this.navCtrl.setRoot(ProfilePage);
      });
    }
    else if(this.userProfile.provider == 'ibuddi'){
      this.storage.remove('userProfile');
      this.navCtrl.setRoot(ProfilePage);
    }
  }

  googleLogin(){
    this.googlePlus.login({
      'webClientId' : '223194861213-3q74vc07j1t50g76lfr7341anbdsldk1.apps.googleusercontent.com'
    }).then(res=>{
        /*alert('Inside googleLogin res'+JSON.stringify(res));*/
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then( data => {
          alert("Firebase success: " + JSON.stringify(data));
          this.userProfile = {id:data.uid, name:data.displayName, picture:data.photoURL, email:data.email, provider:'facebook', role:'user'}
        }).catch( error => alert("Firebase failure: " + JSON.stringify(error)));
    }).catch(err=>alert('Error is'+err));
  }

  googleLogout(){
    firebase.auth().signOut().then(data=>{
      console.log('signout Successful');
    }).catch(err=>{
      console.log('Error is '+JSON.stringify(err));
    });
  }

  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential)
          .then( data => { 
             this.userProfile = {id:data.uid, name:data.displayName, picture:data.photoURL, email:data.email, provider:'facebook', role:'user'}
             this.storage.set('userProfile',this.userProfile);
            //alert("Firebase success: " + JSON.stringify(data)); 
          });

      }).catch((error) => { alert('Error is'+error) });
  }

}




  //facebook

/*  facebookLogin(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if(res.status === "connected") {
        this.isLoggedIn = true;
        this.fbUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => {
        console.log('Error logging into Facebook', e);
        //alert('Error inside facebookLogin'+JSON.stringify(e));
      });
  }

  facebookLogout(){
    this.fb.logout().then( res => {
      this.isLoggedIn = false;
      this.storage.remove('userProfile');
      this.navCtrl.setRoot(ProfilePage);

    }).catch( e => {
      console.log('Error logout from Facebook', e);
      alert('Error in logout'+ e);
    });
  }
  fbUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {
      

      this.userProfile={id:res.id, name:res.name, device_id:this.device.uuid, picture:res.picture.data.url, email:res.email, gender: res.gender, provider:'facebook', role:'fbuser', status:res.status}
      this.storage.set('userProfile',this.userProfile);
      this.provider.fbSignupData(this.userProfile).subscribe(data => {
        if(data.result == 'success'){
          alert('Data added Successfully');
        }
        else
          alert('Unable to create User'+data.message);
        },
        err=>{
          alert('Error is'+err);
        });
      }).catch(e => {
        alert('Try again later '+e);
    });
  }*/

/*
logout(){
    if(this.userProfile.provider=='facebook'){
      this.fb.logout().then( res => {
        this.isLoggedIn = false;
        this.navCtrl.setRoot(ProfilePage);
        this.storage.remove('userProfile');
      }).catch( e => {
        console.log('Error logging out from Facebook', e);
        alert('Error in logout'+ e);
      });
    }
    else if(this.userProfile.provider == 'ibuddi'){
      this.navCtrl.setRoot(ProfilePage);
      this.storage.remove('userProfile');
    }
  }
*/