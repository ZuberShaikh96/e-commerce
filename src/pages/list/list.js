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
import { LocationsProvider } from '../../providers/locations/locations';
import { DetailsPage } from '../details/details';
import { MapPage } from '../map/map';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { LoadingController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, diagnostic, navParams, locations, locationAccuracy, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.diagnostic = diagnostic;
        this.navParams = navParams;
        this.locations = locations;
        this.locationAccuracy = locationAccuracy;
        this.loadingCtrl = loadingCtrl;
    }
    ListPage.prototype.locationcheck = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        /*alert("check location  is CALLED:");*/
        this.diagnostic.isLocationEnabled().then(function (isAvailable) {
            if (!isAvailable) {
                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                    _this.location = JSON.stringify(_this.locations.load());
                    _this.loading.dismiss();
                }, function (error) { return alert('Error requesting location permissions' + error); });
            }
            else {
                _this.location = JSON.stringify(_this.locations.load());
                _this.loading.dismiss();
                // alert('location already enable ');
            }
        }).catch(function (e) {
            console.log(e);
            alert('Enable location ' + JSON.stringify(e));
        });
    };
    ListPage.prototype.ionViewWillEnter = function () {
        this.locationcheck();
        /*development purpose. Remove or comment when deploying or building to device*/
        this.location = JSON.stringify(this.locations.load());
        this.loading.dismiss();
        console.log('ionViewDidLoad ListPage');
        console.log(this.location);
    };
    ListPage.prototype.itemTapped = function (event, item) {
        this.navCtrl.push(DetailsPage, {
            item: item
        });
    };
    ListPage.prototype.opnMap = function () {
        this.navCtrl.push(MapPage);
    };
    ListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-list',
            templateUrl: 'list.html',
        }),
        __metadata("design:paramtypes", [NavController, Diagnostic, NavParams, LocationsProvider, LocationAccuracy, LoadingController])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map