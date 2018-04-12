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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the MywishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MywishlistPage = /** @class */ (function () {
    function MywishlistPage(navCtrl, navParams, device, provider, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.device = device;
        this.provider = provider;
        this.toastCtrl = toastCtrl;
        this.user_id = this.navParams.data;
        this.viewMyWishlist();
    }
    MywishlistPage.prototype.viewMyWishlist = function () {
        var _this = this;
        this.provider.viewWishlist(this.device.uuid, this.user_id)
            .subscribe(function (data) {
            console.log(JSON.stringify(data));
            if (!data.result) {
                _this.wishlistItems = data;
                console.log('Data inside my wishlist' + JSON.stringify(_this.wishlistItems));
                console.log('Data results' + data.result);
            }
        });
    };
    MywishlistPage.prototype.removeFromWishlist = function (item) {
        var _this = this;
        this.removeitem = { p_id: item.p_id, device_id: this.device.uuid, u_id: this.user_id, s_id: item.s_id };
        console.log('Data remove ' + JSON.stringify(this.removeitem));
        this.provider.addToWishlist(this.removeitem)
            .subscribe(function (data) {
            console.log('Data inside Add to wishlist ' + JSON.stringify(data));
            if (data.result == 'product removed') {
                var toast = _this.toastCtrl.create({
                    message: 'Product deleted from wishlist',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                _this.viewMyWishlist();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Unable to add product into wishlist',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
        }, // success path
        function (// success path
            error) {
            console.log("Error inside Wishlist is" + JSON.stringify(error));
        }); // error path
    };
    MywishlistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MywishlistPage');
    };
    MywishlistPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-mywishlist',
            templateUrl: 'mywishlist.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Device, RestProvider, ToastController])
    ], MywishlistPage);
    return MywishlistPage;
}());
export { MywishlistPage };
//# sourceMappingURL=mywishlist.js.map