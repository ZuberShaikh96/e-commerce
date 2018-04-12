import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { FormControl, Validators,FormGroup} from '@angular/forms';
import { OnInit } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { ProfilePage } from '../profile/profile';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  error;
  userRes;
	user:FormGroup;
	user_data = { name: '', email: '', pswd:'', c_pswd:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController,public provider:RestProvider, private device:Device) {
  }

  ngOnInit(){
    
    this.user = new FormGroup({
      name: new FormControl('' , [Validators.required]),
      email: new FormControl('' , [Validators.required]),
      pswd: new FormControl('' , [Validators.required]),
      c_pswd: new FormControl('' , [Validators.required]),
      phone_no: new FormControl(),
      device_id: new FormControl(this.device.uuid)
    });
  }

  signupUser(){
    console.log('Inside SignUp user');
    this.provider.signupUser(this.user.value).subscribe( data => {
      console.log('userdata from response is'+JSON.stringify(data));
      console.log("Result is "+data.result);
      console.log("Message is"+data.message);
      if(data.result == 'success'){
        alert('Data added Successfully');
        this.navCtrl.push(ProfilePage);
      } else
        alert('Unable to create User'+data.message);
      },
      error => {
        console.log("Error is"+JSON.stringify(error));
    });
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
}

