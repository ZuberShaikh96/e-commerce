var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs'; //supertabs
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SignupPageModule } from '../pages/signup/signup.module';
import { SearchPageModule } from '../pages/search/search.module';
import { ProductlistPageModule } from '../pages/productlist/productlist.module';
import { ProductdetailsPageModule } from '../pages/productdetails/productdetails.module';
import { MycartPageModule } from '../pages/mycart/mycart.module';
import { MywishlistPageModule } from '../pages/mywishlist/mywishlist.module';
import { FavstorePageModule } from '../pages/favstore/favstore.module';
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
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                TabsPage
            ],
            imports: [
                BrowserModule,
                SuperTabsModule.forRoot(),
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
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                RestProvider,
                Geolocation,
                CallNumber,
                LocationsProvider,
                AppState,
                GoogleMaps,
                Device,
                LocationAccuracy,
                Diagnostic
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map