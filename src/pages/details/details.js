var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation } from '@ionic-native/geolocation';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
var DetailsPage = /** @class */ (function () {
    function DetailsPage(navCtrl, navParams, callNumber /*private launchNavigator: LaunchNavigator*/, geolocation, provider, storage, device, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.callNumber = callNumber; /*private launchNavigator: LaunchNavigator*/
        this.geolocation = geolocation;
        this.provider = provider;
        this.storage = storage;
        this.device = device;
        this.toastCtrl = toastCtrl;
        this.img = [];
        this.selectedItem = navParams.get('item');
        console.log('this.selectedItem.s_imageUrl is ' + this.selectedItem.s_imageUrl);
        //this.sliderImage = this.selectedItem.s_imageUrl;
        this.sliderImage = JSON.parse(this.selectedItem.s_imageUrl);
        console.log(this.sliderImage.length);
        console.log(this.sliderImage[0].img);
        console.log(this.sliderImage[1].img);
        for (var i = 0; i < this.sliderImage.length; i++) {
            this.img = this.sliderImage[i].img;
        }
    }
    DetailsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('id').then(function (data) {
            _this.id = data;
        });
    };
    DetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailsPage');
        console.log(this.selectedItem);
    };
    DetailsPage.prototype.addToCart = function (item) {
        var _this = this;
        var cartItems = { p_id: item.p_id, p_name: item.p_name, p_quantity: ++item.p_quantity, s_id: this.selectedItem.s_id, device_id: this.device.uuid, u_id: this.id };
        this.provider.addToCart(cartItems).subscribe(function (data) {
            console.log('Data inside Add to cart is ' + JSON.stringify(data));
            if (data.result == 'success') {
                var toast = _this.toastCtrl.create({
                    message: 'Product added to cart successfully',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Unable to add product in cart',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
        }, function (error) {
            console.log("Error inside Addtocart is" + JSON.stringify(error));
        });
    };
    DetailsPage.prototype.addToWishlist = function (item) {
        var _this = this;
        var wishlistItems = { p_id: item.p_id, s_id: this.selectedItem.s_id, device_id: this.device.uuid, u_id: this.id.id };
        this.provider.addToWishlist(wishlistItems).subscribe(function (data) {
            console.log('Data inside Add to wishlist ' + JSON.stringify(data));
            if (data.result == 'success') {
                var toast = _this.toastCtrl.create({
                    message: 'Product added to wishlist',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else if (data.result == 'product removed') {
                var toast = _this.toastCtrl.create({
                    message: 'Product deleted from wishlist',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Unable to add product into wishlist',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
        }, function (error) {
            console.log("Error inside Wishlist is" + JSON.stringify(error));
        });
    };
    DetailsPage.prototype.addFavStore = function () {
        var _this = this;
        var fav_store = { user_id: this.id.id, device_id: this.device.uuid, s_id: this.selectedItem.s_id };
        this.provider.addFavStore(fav_store).subscribe(function (data) {
            console.log('Data inside Add to fav store ' + JSON.stringify(data.result));
            if (data.result == 'success') {
                var toast = _this.toastCtrl.create({
                    message: 'Store added as favourite',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else if (data.result == 'shop removed') {
                var toast = _this.toastCtrl.create({
                    message: 'Shop removed from Favourite',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Unable to add shop as favourite',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
        }, function (error) {
            console.log("Error inside Wishlist is" + JSON.stringify(error));
        });
    };
    DetailsPage.prototype.removeFromCart = function (item) {
        var _this = this;
        --item.p_quantity;
        var r_item = { p_id: item.p_id, device_id: this.device.uuid, u_id: this.id };
        this.provider.removeFromCart(r_item).subscribe(function (data) {
            console.log(' Data inside Add to cart is ' + JSON.stringify(data));
            if (data.result == 'success') {
                var toast = _this.toastCtrl.create({
                    message: 'Product deleted from cart',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Unable to deleted product from cart',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
        }, function (error) {
            console.log("Error inside removeFromCart is" + JSON.stringify(error));
        });
    };
    DetailsPage.prototype.Calculate = function () {
        console.log('latitude ' + this.selectedItem.s_latitude);
        console.log('lngitude ' + this.selectedItem.s_longitude);
        this.geolocation.getCurrentPosition().then(function (resp) {
        }).catch(function (error) {
            alert('Error getting location' + error);
        });
    };
    DetailsPage.prototype.dialer = function () {
        this.callNumber.callNumber(this.selectedItem.s_number, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    DetailsPage.prototype.clicked = function (item) {
        this.items = item;
        console.log('Item is' + JSON.stringify(item));
    };
    DetailsPage.prototype.changeSlide = function (item) {
        this.items = item;
        console.log('Item is' + JSON.stringify(item));
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], DetailsPage.prototype, "slides", void 0);
    DetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-details',
            templateUrl: 'details.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, CallNumber /*private launchNavigator: LaunchNavigator*/, Geolocation, RestProvider, Storage, Device, ToastController])
    ], DetailsPage);
    return DetailsPage;
}());
export { DetailsPage };
//# sourceMappingURL=details.js.map