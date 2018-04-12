import { GoogleMap, GoogleMapsEvent,Marker, LatLng} from '@ionic-native/google-maps';
import { Component, ViewChild, ElementRef } from "@angular/core/";
import { Slides ,LoadingController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationsProvider } from '../../providers/locations/locations';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {
  @ViewChild('map') mapElement:ElementRef;
   @ViewChild(Slides) slides: Slides;
    private map: GoogleMap;
    /*private flag :boolean = false;*/
    private slide;
   
    constructor(private geolocation:Geolocation, private locations: LocationsProvider ,public loadingCtrl: LoadingController) {  
        
        }
    
    ionViewWillEnter(){
      let loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });
          loading.present();
          this.loadGoogleMap();
          loading.dismiss();
    }
  
  addCircle(location,map){
     this.map.addCircle({
        'center': location,
        'radius': 1000,
        'strokeColor' : '#9b0101',
        'strokeWidth': 1,
        'fillColor' : 'rgb(235,35,35,0.25)'
      })
  }
    loadGoogleMap(){
      //alert('Inside load google map()');
      this.geolocation.getCurrentPosition().then((pos)=>{
        let location = new LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map = new GoogleMap ('map',{
        controls: {
               compass: true,
               myLocationButton: true,
               indoorPicker: true,
               zoom: true,  
               mapToolbar:true
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
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          this.map.setMyLocationEnabled(true);
          this.addCircle(location,this.map);
          /*alert('Map is ready');*/
           this.getMarkers();
      
      },err=>{
        alert('Error');
        })

      }).catch((err)=>{
        alert('Location not enabled, Check your location settings');
        });
    }

    getMarkers(){
      this.locations.load().then(store=>{

          let slide = store;
         for(let location of store){  

          this.map.addMarker({
            title:location.s_name,
            position:{
              lat:location.s_latitude,
              lng:location.s_longitude
              },
            icon:{ url: "./assets/icon/icon.png" }
          }).then(marker=>{
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((data)=>{
                this.slide = store;
              let markers:Marker = data[1];
                markers.setTitle(markers.get("name"));
                markers.setSnippet(markers.get("address"));
                markers.showInfoWindow(); 
                this.showSlide(marker, slide);

                },err=>{
                alert('Hard Luck'+err);
            });

          }).catch(err=>{
             alert('Error'+err);
              });
          }
             }).catch(err=>{
               alert(err);
                });
    }
    showSlide(marker, slide){
      this.slide = slide;
      for (let loc of slide){
        if(((marker[0].lat) == (loc.s_latitude)) && ((marker[0].lng)==(loc.s_longitude))){
          alert(loc.s_name+ 'clicked');
        }
      }
    }
    swipe(ldata){

    }

}

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