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
import { ProductdetailsPage } from '../productdetails/productdetails';
/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductlistPage = /** @class */ (function () {
    function ProductlistPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selectedProduct = navParams.get('item');
        this.items = [{ title: "Beer", price: 150, icon: "beer", img: "/assets/imgs/beer.jpg", desc: "Beer is one of the oldest and most widely consumed alcoholic drinks in the world, and the third most popular drink overall after water and tea. Beer is brewed from cereal grains—most commonly from malted barley, though wheat, maize (corn), and rice are also used. During the brewing process, fermentation of the starch sugars in the wort produces ethanol and carbonation in the resulting beer" },
            { title: "Cider", price: 180, icon: "beer", img: "/assets/imgs/cider.jpg", desc: "Cider, hard apple cider, or hard cider in the US, is an alcoholic beverage made from the fermented juice of apples. Cider is popular in the United Kingdom, especially in the West Country, and widely available. The UK has the world's highest per capita consumption, as well as its largest cider-producing companies. Cider is also popular in many Commonwealth countries, such as Canada, Australia,and New Zealand." },
            { title: "Liquor", price: 200, icon: "beer", img: "assets/imgs/liquor", desc: "" }, { title: "Hard Soda", price: 250, icon: "beer", img: "", desc: "" },
            { title: "Wine", price: 350, icon: "beer", img: "", desc: "" }, { title: "Barley", price: 450, icon: "beer", img: "", desc: "" },
            { title: "Hot Drinks", price: 850, icon: "beer", img: "", desc: "" }, { title: "Mixed Drinks", price: 550, icon: "beer", img: "", desc: "" },
            { title: "Caffeinated", price: 150, icon: "beer", img: "", desc: "" }, { title: "Vodka", price: 450, icon: "beer", img: "", desc: "" },
            { title: "Soft Drinks", price: 550, icon: "beer", img: "", desc: "" }];
    }
    ProductlistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductlistPage');
    };
    ProductlistPage.prototype.itemSelected = function (item) {
        this.navCtrl.push(ProductdetailsPage, {
            item: item
        });
    };
    ProductlistPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-productlist',
            templateUrl: 'productlist.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], ProductlistPage);
    return ProductlistPage;
}());
export { ProductlistPage };
//# sourceMappingURL=productlist.js.map