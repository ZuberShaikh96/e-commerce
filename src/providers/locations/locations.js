var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
var LocationsProvider = /** @class */ (function () {
    function LocationsProvider(http, geolocation) {
        this.http = http;
        this.geolocation = geolocation;
        /*     private lat:any;
             private lng:any;*/
        this.url = "http://sitepro.shreewebs.com/Abhilasha/ecommerce/api/Products/all_Details?X-API-KEY=CODEX@123";
        console.log('Hello LocationsProvider Provider');
        /*this.getCurrentPosition();*/
    }
    LocationsProvider.prototype.load = function () {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.http.get(_this.url).map(function (res) { return res.json(); }).subscribe(function (data) {
                _this.geolocation.getCurrentPosition().then(function (resp) {
                    console.log('database data is ' + JSON.stringify(data));
                    var position = { lat: resp.coords.latitude, lng: resp.coords.longitude };
                    //console.log('data.locations'+data);
                    _this.data = _this.applyHaversine(data, position);
                    _this.data.sort(function (locationA, locationB) {
                        return locationA.distance - locationB.distance;
                    });
                    resolve(_this.data);
                }).catch(function (error) {
                    console.log('Error getting location inside httpget', error);
                });
            });
        });
    };
    LocationsProvider.prototype.applyHaversine = function (locations, usersLocation) {
        var _this = this;
        console.log('user latitude is ' + usersLocation.lat);
        locations.map(function (location) {
            var placeLocation = {
                lat: location.s_latitude,
                lng: location.s_longitude
            };
            location.distance = _this.getDistanceBetweenPoints(usersLocation, placeLocation, 'km').toFixed(2);
        });
        return locations;
    };
    LocationsProvider.prototype.getDistanceBetweenPoints = function (start, end, units) {
        var earthRadius = {
            miles: 3958.8,
            km: 6371
        };
        var R = earthRadius[units || 'km'];
        var lat1 = start.lat;
        var lon1 = start.lng;
        var lat2 = end.lat;
        var lon2 = end.lng;
        var dLat = this.toRad((lat2 - lat1));
        var dLon = this.toRad((lon2 - lon1));
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    LocationsProvider.prototype.toRad = function (x) {
        return x * Math.PI / 180;
    };
    LocationsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Geolocation])
    ], LocationsProvider);
    return LocationsProvider;
}());
export { LocationsProvider };
//# sourceMappingURL=locations.js.map