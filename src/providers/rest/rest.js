var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators'; //, retry
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-API-KEY': 'CODEX@123',
        'username': 'admin',
        'password': '1234',
        'Response-Type': 'text'
    })
};
var RestProvider = /** @class */ (function () {
    function RestProvider(http) {
        this.http = http;
        this.url = "http://sitepro.shreewebs.com/Abhilasha/ecommerce/api/Accounts";
        this.url2 = "http://sitepro.shreewebs.com/Abhilasha/ecommerce/api/Products";
        this.homeUrl = "http://sitepro.shreewebs.com/Abhilasha/ecommerce/api/Home/home_images";
        console.log('Hello RestProvider Provider');
    }
    RestProvider.prototype.homeSlider = function () {
        return this.http.get(this.homeUrl, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    };
    RestProvider.prototype.signupUser = function (data) {
        return this.http.post(this.url + '/user', JSON.stringify(data), httpOptions).pipe(catchError(this.handleError));
    };
    RestProvider.prototype.login = function (data) {
        return this.http.post(this.url + '/login', JSON.stringify(data), httpOptions).pipe(catchError(this.handleError));
    };
    RestProvider.prototype.fbSignupData = function (data) {
        //alert('Data inside fbSignupData' + JSON.stringify(data));
        return this.http.post(this.url + '/fbuser', JSON.stringify(data), httpOptions).pipe(catchError(this.handleError));
    };
    RestProvider.prototype.addToCart = function (data) {
        console.log("Data inside rest Cartitems" + JSON.stringify(data));
        return this.http.post(this.url2 + '/cart', JSON.stringify(data), httpOptions).pipe(catchError(this.handleError));
    };
    RestProvider.prototype.removeFromCart = function (data) {
        console.log("Data inside rest remove from cart" + JSON.stringify(data));
        return this.http.post(this.url2 + '/cart_delete', JSON.stringify(data), httpOptions).pipe(catchError(this.handleError));
    };
    RestProvider.prototype.addToWishlist = function (data) {
        console.log("Data inside rest remove from cart" + JSON.stringify(data));
        return this.http.post(this.url2 + '/wishlist', JSON.stringify(data), httpOptions).pipe(catchError(this.handleError));
    };
    RestProvider.prototype.viewCart = function (device_id, user_id) {
        var data = { device_id: device_id, user_id: user_id };
        return this.http.post(this.url2 + '/user_cart', JSON.stringify(data), httpOptions).pipe(catchError(this.handleError));
    };
    RestProvider.prototype.getFavStore = function (user_id, dev_id) {
        console.log("Device id is" + dev_id);
        var data = { user_id: user_id, device_id: dev_id };
        return this.http.post(this.url2 + '/get_fav_shop', JSON.stringify(data), httpOptions).pipe(catchError(this.handleError));
    };
    RestProvider.prototype.viewWishlist = function (device_id, user_id) {
        var data = { device_id: device_id, user_id: user_id };
        return this.http.post(this.url2 + '/user_wishlist', JSON.stringify(data), httpOptions).pipe(catchError(this.handleError));
    };
    RestProvider.prototype.addFavStore = function (data) {
        console.log('Data inside rest addFavStore' + JSON.stringify(data));
        return this.http.post(this.url2 + '/fav_store', JSON.stringify(data), httpOptions)
            .pipe(catchError(this.handleError));
    };
    RestProvider.prototype.extractData = function (res) {
        var body = res;
        console.log('res is' + res);
        console.log('body is' + body);
        return body || [];
    };
    RestProvider.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            var err = error || '';
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    RestProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], RestProvider);
    return RestProvider;
}());
export { RestProvider };
//# sourceMappingURL=rest.js.map