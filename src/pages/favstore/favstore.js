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
import { RestProvider } from '../../providers/rest/rest';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the FavstorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FavstorePage = /** @class */ (function () {
    function FavstorePage(navCtrl, navParams, provider, device, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.provider = provider;
        this.device = device;
        this.toastCtrl = toastCtrl;
        this.user_id = this.navParams.get('id');
        console.log('Data is:' + JSON.stringify(this.user_id));
        this.getFavStore();
    }
    FavstorePage.prototype.getFavStore = function () {
        var _this = this;
        this.provider.getFavStore(this.user_id, this.device.uuid)
            .subscribe(function (data) {
            console.log(JSON.stringify(data));
            if (!data.result) {
                _this.favStore = data;
                console.log('Data inside getFavStore' + JSON.stringify(_this.favStore));
            }
        });
    };
    FavstorePage.prototype.removeFavStore = function (data) {
        var _this = this;
        this.removeStore = { user_id: this.user_id, device_id: this.device.uuid, s_id: data };
        console.log('Shop id is ' + this.favStore.s_id);
        this.provider.addFavStore(this.removeStore)
            .subscribe(function (data) {
            if (data.result == 'shop removed') {
                var toast = _this.toastCtrl.create({
                    message: 'Shop removed from Favourite',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
                _this.getFavStore();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Unable to remove shop as favourite',
                    duration: 2000,
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
    FavstorePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FavstorePage');
    };
    FavstorePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-favstore',
            templateUrl: 'favstore.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider, Device, ToastController])
    ], FavstorePage);
    return FavstorePage;
}());
export { FavstorePage };
//# sourceMappingURL=favstore.js.map