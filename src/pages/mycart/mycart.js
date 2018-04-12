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
import { RestProvider } from '../../providers/rest/rest';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the MycartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MycartPage = /** @class */ (function () {
    function MycartPage(navCtrl, navParams, provider, device) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.provider = provider;
        this.device = device;
        this.user_id = this.navParams.data;
        this.viewCart();
    }
    MycartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MycartPage');
    };
    MycartPage.prototype.viewCart = function () {
        var _this = this;
        console.log('user_id' + JSON.stringify(this.user_id));
        this.provider.viewCart(this.device.uuid, this.user_id)
            .subscribe(function (data) {
            console.log(JSON.stringify(data));
            if (!data.result) {
                _this.cartItems = data;
                console.log('Data inside mycart viewCart' + JSON.stringify(_this.cartItems));
                console.log('Data results' + data.result);
            }
        });
    };
    MycartPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-mycart',
            templateUrl: 'mycart.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider, Device])
    ], MycartPage);
    return MycartPage;
}());
export { MycartPage };
//# sourceMappingURL=mycart.js.map