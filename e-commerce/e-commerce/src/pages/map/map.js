var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { Component, ViewChild, ElementRef } from "@angular/core/";
import { Slides, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationsProvider } from '../../providers/locations/locations';
var MapPage = /** @class */ (function () {
    function MapPage(geolocation, locations, loadingCtrl) {
        this.geolocation = geolocation;
        this.locations = locations;
        this.loadingCtrl = loadingCtrl;
    }
    MapPage.prototype.ionViewWillEnter = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.loadGoogleMap();
        loading.dismiss();
    };
    MapPage.prototype.addCircle = function (location, map) {
        this.map.addCircle({
            'center': location,
            'radius': 1000,
            'strokeColor': '#9b0101',
            'strokeWidth': 1,
            'fillColor': 'rgb(235,35,35,0.25)'
        });
    };
    MapPage.prototype.loadGoogleMap = function () {
        var _this = this;
        //alert('Inside load google map()');
        this.geolocation.getCurrentPosition().then(function (pos) {
            var location = new LatLng(pos.coords.latitude, pos.coords.longitude);
            _this.map = new GoogleMap('map', {
                controls: {
                    compass: true,
                    myLocationButton: true,
                    indoorPicker: true,
                    zoom: true,
                    mapToolbar: true
                },
                gestures: {
                    scroll: true,
                    tilt: true,
                    rotate: true,
                    zoom: true
                },
                camera: {
                    target: location,
                    zoom: 15,
                    tilt: 30
                }
            });
            _this.map.on(GoogleMapsEvent.MAP_READY).subscribe(function () {
                _this.map.setMyLocationEnabled(true);
                _this.addCircle(location, _this.map);
                /*alert('Map is ready');*/
                _this.getMarkers();
            }, function (err) {
                alert('Error');
            });
        }).catch(function (err) {
            alert('Location not enabled, Check your location settings');
        });
    };
    MapPage.prototype.getMarkers = function () {
        var _this = this;
        this.locations.load().then(function (store) {
            var slide = store;
            for (var _i = 0, store_1 = store; _i < store_1.length; _i++) {
                var location_1 = store_1[_i];
                _this.map.addMarker({
                    title: location_1.s_name,
                    position: {
                        lat: location_1.s_latitude,
                        lng: location_1.s_longitude
                    },
                    icon: { url: "./assets/icon/icon.png" }
                }).then(function (marker) {
                    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(function (data) {
                        _this.slide = store;
                        var markers = data[1];
                        markers.setTitle(markers.get("name"));
                        markers.setSnippet(markers.get("address"));
                        markers.showInfoWindow();
                        _this.showSlide(marker, slide);
                    }, function (err) {
                        alert('Hard Luck' + err);
                    });
                }).catch(function (err) {
                    alert('Error' + err);
                });
            }
        }).catch(function (err) {
            alert(err);
        });
    };
    MapPage.prototype.showSlide = function (marker, slide) {
        this.slide = slide;
        for (var _i = 0, slide_1 = slide; _i < slide_1.length; _i++) {
            var loc = slide_1[_i];
            if (((marker[0].lat) == (loc.s_latitude)) && ((marker[0].lng) == (loc.s_longitude))) {
                alert(loc.s_name + 'clicked');
            }
        }
    };
    MapPage.prototype.swipe = function (ldata) {
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], MapPage.prototype, "mapElement", void 0);
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], MapPage.prototype, "slides", void 0);
    MapPage = __decorate([
        Component({
            selector: 'page-map',
            templateUrl: 'map.html'
        }),
        __metadata("design:paramtypes", [Geolocation, LocationsProvider, LoadingController])
    ], MapPage);
    return MapPage;
}());
export { MapPage };
/*  swipe(marker, store){
     //alert('inside slider function');
     for (let loc of store){
       if(((marker[0].lat) == (loc.s_latitude)) && ((marker[0].lng)==(loc.s_longitude))){
        // alert(loc.s_name+ 'clicked');
         this.slide = store;
         this.slide.push(loc);
       }
     }
  }*/ 
//# sourceMappingURL=map.js.map