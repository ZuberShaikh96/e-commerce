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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { ProfilePage } from '../profile/profile';
import { Device } from '@ionic-native/device';
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, modalCtrl, provider, device) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.provider = provider;
        this.device = device;
        this.user_data = { name: '', email: '', pswd: '', c_pswd: '' };
    }
    SignupPage.prototype.ngOnInit = function () {
        this.user = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            pswd: new FormControl('', [Validators.required]),
            c_pswd: new FormControl('', [Validators.required]),
            phone_no: new FormControl(),
            device_id: new FormControl(this.device.uuid)
        });
    };
    SignupPage.prototype.signupUser = function () {
        var _this = this;
        console.log('Inside SignUp user');
        this.provider.signupUser(this.user.value).subscribe(function (data) {
            console.log('userdata from response is' + JSON.stringify(data));
            console.log("Result is " + data.result);
            console.log("Message is" + data.message);
            if (data.result == 'success') {
                alert('Data added Successfully');
                _this.navCtrl.push(ProfilePage);
            }
            else
                alert('Unable to create User' + data.message);
        }, function (error) {
            console.log("Error is" + JSON.stringify(error));
        });
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ModalController, RestProvider, Device])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map