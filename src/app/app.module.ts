import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule} from 'ionic2-super-tabs'; //supertabs

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SignupPageModule } from '../pages/signup/signup.module';
import { SearchPageModule } from '../pages/search/search.module'
import { ProductlistPageModule } from '../pages/productlist/productlist.module';
import { ProductdetailsPageModule } from '../pages/productdetails/productdetails.module';
import { MycartPageModule } from '../pages/mycart/mycart.module';
import { MywishlistPageModule } from '../pages/mywishlist/mywishlist.module';
import { FavstorePageModule } from '../pages/favstore/favstore.module';
import {CheckoutPageModule } from '../pages/checkout/checkout.module';
/*Saajid */
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation } from '@ionic-native/geolocation';
import { DetailsPageModule } from '../pages/details/details.module';
import { MapPageModule } from '../pages/map/map.module';
import { ListPageModule } from '../pages/list/list.module';
import { LocationsProvider } from '../providers/locations/locations';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { AppState } from './app.global';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook'
import { LaunchNavigator } from '@ionic-native/launch-navigator';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    SuperTabsModule.forRoot(),      //supertabs
    IonicModule.forRoot(MyApp),
    ProfilePageModule,
    HttpModule,
    HttpClientModule,
    SignupPageModule,
    SearchPageModule,
    ListPageModule,
    MapPageModule,
    DetailsPageModule,
    ProductlistPageModule,
    ProductdetailsPageModule,
    MycartPageModule,
    MywishlistPageModule,
    FavstorePageModule,
    CheckoutPageModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Geolocation,
    CallNumber,
    LocationsProvider,
    AppState,
    GoogleMaps,
    Device,
    LocationAccuracy,
    Diagnostic,
    GooglePlus,
    Facebook,
    LaunchNavigator

  ]
})
export class AppModule {}
