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
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { RestProvider } from '../../providers/rest/rest';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, provider) {
        this.navCtrl = navCtrl;
        this.provider = provider;
        this.splash = true;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () { return _this.splash = false; }, 4000);
        this.getImages();
    };
    HomePage.prototype.opnPage = function () {
        this.navCtrl.push(SearchPage);
    };
    HomePage.prototype.getImages = function () {
        var _this = this;
        this.provider.homeSlider()
            .subscribe(function (data) {
            console.log(data[0].homeImage);
            _this.sliderImg = JSON.parse(data[0].homeImage);
            //console.log('sliderImg '+JSON.stringify(this.sliderImg.homeImage));
            console.log(_this.sliderImg);
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, RestProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map