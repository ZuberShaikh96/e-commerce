import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationsProvider {
	 data: any;
/*     private lat:any;
     private lng:any;*/
     private url="http://sitepro.shreewebs.com/Abhilasha/ecommerce/api/Products/all_Details?X-API-KEY=CODEX@123";

  constructor(public http: Http ,private geolocation: Geolocation) {
    console.log('Hello LocationsProvider Provider');
    /*this.getCurrentPosition();*/
  }

    load(){
 
       if(this.data){
            return Promise.resolve(this.data);
        }
 
        return new Promise(resolve => {
 
            this.http.get(this.url).map(res => res.json()).subscribe(data => {
               this.geolocation.getCurrentPosition().then((resp) => {
                   console.log('database data is '+ JSON.stringify(data));
                 let position = { lat:resp.coords.latitude, lng:resp.coords.longitude};
                 //console.log('data.locations'+data);
                 this.data = this.applyHaversine(data,position);
                 this.data.sort((locationA, locationB) => {
                    return locationA.distance - locationB.distance;
                 });
                 resolve(this.data);
                 }).catch((error) => {
                    console.log('Error getting location inside httpget', error);
                });
            });
 
        });
    }

     applyHaversine(locations, usersLocation){

       console.log('user latitude is '+usersLocation.lat);
        locations.map((location) => {
 
            let placeLocation = {
                lat: location.s_latitude,
                lng: location.s_longitude
            };
 
            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'km'
            ).toFixed(2);
        });
 
        return locations;
    }
 
    getDistanceBetweenPoints(start, end, units){
 
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'km'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d;
 
    }
 
    toRad(x){
        return x * Math.PI / 180;
    }
}
