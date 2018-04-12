var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AppState } from '../../app/app.global';
import { Facebook } from '@ionic-native/facebook'; //FacebookLoginResponse
import { GooglePlus } from '@ionic-native/google-plus';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { MycartPage } from '../mycart/mycart';
import { MywishlistPage } from '../mywishlist/mywishlist';
import { FavstorePage } from '../favstore/favstore';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, fb, /*private googlePlus: GooglePlus,*/ global, provider, storage, device, googleplus) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.global = global;
        this.provider = provider;
        this.storage = storage;
        this.device = device;
        this.googleplus = googleplus;
        this.isLoggedIn = false;
        this.storage.get('userProfile').then(function (data) {
            _this.userProfile = data;
        }).catch(function (err) {
            alert('Error is ' + err);
        });
        this.fbLoginStatus();
    }
    ProfilePage_1 = ProfilePage;
    ProfilePage.prototype.fbLoginStatus = function () {
        var _this = this;
        this.fb.getLoginStatus()
            .then(function (res) {
            console.log(res.status);
            //alert(res.status);
            if (res.status === "connect") {
                _this.isLoggedIn = true;
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) { return console.log(e); });
    };
    ProfilePage.prototype.ngOnInit = function () {
        this.user = new FormGroup({
            email: new FormControl('', [Validators.required]),
            pswd: new FormControl('', [Validators.required, Validators.maxLength(10)])
        });
    };
    ProfilePage.prototype.login = function () {
        var _this = this;
        this.provider.login(this.user.value)
            .subscribe(function (data) {
            console.log('user data is' + JSON.stringify(data.userdata));
            if (data.result == "true") {
                if (data.userdata.roleId === "3") {
                    _this.userProfile = { id: data.userdata.user_id, name: data.userdata.name, picture: data.userdata.imageUrl, email: data.userdata.email, provider: 'ibuddi', role: 'admin' };
                    _this.storage.set('userProfile', _this.userProfile);
                    console.log('userProfile' + JSON.stringify(_this.userProfile));
                }
                else if (data.userdata.roleId === "4") {
                    _this.userProfile = { id: data.userdata.user_id, name: data.userdata.name, picture: data.userdata.imageUrl, email: data.userdata.email, provider: 'ibuddi', role: 'seller' };
                    _this.storage.set('userProfile', _this.userProfile);
                }
                else if (data.userdata.roleId === "5") {
                    _this.userProfile = { id: data.userdata.user_id, name: data.userdata.name, picture: data.userdata.imageUrl, email: data.userdata.email, provider: 'ibuddi', role: 'user' };
                    _this.storage.set('userProfile', _this.userProfile);
                }
            }
            else {
                alert(data.message);
                console.log('Role Id' + data.userdata);
            }
        }, function (error) {
            console.log("Error is" + JSON.stringify(error));
        }); // error path
    };
    ProfilePage.prototype.openSignup = function () {
        this.navCtrl.push(SignupPage);
    };
    ProfilePage.prototype.gotoMyCart = function () {
        this.navCtrl.push(MycartPage, this.userProfile.id);
    };
    ProfilePage.prototype.gotoMywishlist = function () {
        this.navCtrl.push(MywishlistPage, this.userProfile.id);
    };
    ProfilePage.prototype.gotoMyFavStore = function () {
        this.navCtrl.push(FavstorePage, { id: this.userProfile.id });
    };
    ProfilePage.prototype.changeTheme = function (theme) {
        this.global.set('theme', theme);
    };
    ProfilePage.prototype.logout = function () {
        this.storage.remove('userProfile');
        this.navCtrl.setRoot(ProfilePage_1);
    };
    //facebook
    ProfilePage.prototype.facebookLogin = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            if (res.status === "connected") {
                _this.isLoggedIn = true;
                _this.fbUserDetail(res.authResponse.userID);
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) {
            console.log('Error logging into Facebook', e);
            //alert('Error inside facebookLogin'+JSON.stringify(e));
        });
    };
    ProfilePage.prototype.facebookLogout = function () {
        var _this = this;
        this.fb.logout().then(function (res) {
            _this.isLoggedIn = false;
            _this.storage.remove('userProfile');
            _this.navCtrl.setRoot(ProfilePage_1);
        }).catch(function (e) {
            console.log('Error logout from Facebook', e);
            alert('Error in logout' + e);
        });
    };
    ProfilePage.prototype.fbUserDetail = function (userid) {
        var _this = this;
        this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
            .then(function (res) {
            /*alert('fbuserid is'+res.id);*/
            _this.userProfile = { id: res.id, name: res.name, device_id: _this.device.uuid, picture: res.picture.data.url, email: res.email, gender: res.gender, provider: 'facebook', role: 'fbuser', status: res.status };
            _this.storage.set('userProfile', _this.userProfile);
            _this.provider.fbSignupData(_this.userProfile).subscribe(function (data) {
                if (data.result == 'success') {
                    alert('Data added Successfully');
                }
                else
                    alert('Unable to create User' + data.message);
            }, function (err) {
                alert('Error is' + err);
            });
        }).catch(function (e) {
            alert('Try again later ' + e);
        });
    };
    ProfilePage.prototype.googleLogin = function () {
        var _this = this;
        this.googleplus.login({})
            .then(function (res) {
            console.log(res);
            alert(JSON.stringify(res));
            alert('Welcome ' + res.displayName);
            _this.displayName = res.displayName;
            _this.email = res.email;
            _this.familyName = res.familyName;
            _this.givenName = res.givenName;
            _this.userId = res.userId;
            _this.imageUrl = res.imageUrl;
            _this.isLoggedIn = true;
        }, function (err) {
            console.error(err);
            alert('Error is' + JSON.stringify(err));
        });
    };
    ProfilePage.prototype.googleLogout = function () {
        var _this = this;
        this.googleplus.logout()
            .then(function (res) {
            console.log(res);
            _this.displayName = "";
            _this.email = "";
            _this.familyName = "";
            _this.givenName = "";
            _this.userId = "";
            _this.imageUrl = "";
            _this.isLoggedIn = false;
        })
            .catch(function (err) { return console.error(err); });
    };
    ProfilePage = ProfilePage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-profile',
            templateUrl: 'profile.html',
            providers: [GooglePlus, Facebook]
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Facebook, AppState, RestProvider, Storage, Device, GooglePlus])
    ], ProfilePage);
    return ProfilePage;
    var ProfilePage_1;
}());
export { ProfilePage };
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
//# sourceMappingURL=profile.js.map