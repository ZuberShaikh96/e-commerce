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
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular'; //Keyboard
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        /*this.search.setFocus();*/
    }
    SearchPage.prototype.ionViewWillEnter = function () {
        /*setTimeout(()=>{this.input.setFocus();},500)*/
        /*    setInterval(()=>{
              this.input.setFocus();
              
            },150);*/
        //this.input.setFocus();
        //this.input.setFocus();
        /*this.kb.show();*/
    };
    SearchPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.input.setFocus(); }, 500);
    };
    __decorate([
        ViewChild(Searchbar),
        __metadata("design:type", Searchbar)
    ], SearchPage.prototype, "input", void 0);
    SearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-search',
            templateUrl: 'search.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.js.map