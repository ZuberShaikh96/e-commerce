import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators'; //, retry

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    'X-API-KEY': 'CODEX@123',
    'username':'admin',
    'password': '1234',
    'Response-Type': 'text'
  })
};

@Injectable()
export class RestProvider {
	url="http://sitepro.shreewebs.com/Abhilasha/ecommerce/api/Accounts";
  url2="http://sitepro.shreewebs.com/Abhilasha/ecommerce/api/Products";
  homeUrl="http://sitepro.shreewebs.com/Abhilasha/ecommerce/api/Home/home_images";
  
	public responseData:string;
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  homeSlider(){

    return this.http.get(this.homeUrl, httpOptions) 
    .map(this.extractData)
    .catch(this.handleError);

  }

  signupUser(data:any){
    return this.http.post(this.url+'/user', JSON.stringify(data), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  login(data:any){
    return this.http.post(this.url+'/login', JSON.stringify(data), httpOptions).pipe(
      catchError(this.handleError));
  }

  fbSignupData(data:any){
    //alert('Data inside fbSignupData' + JSON.stringify(data));
    return this.http.post(this.url + '/fbuser' , JSON.stringify(data) , httpOptions).pipe(
      catchError(this.handleError));
  }
  addToCart(data:any){
    console.log("Data inside rest Cartitems"+JSON.stringify(data));
    return this.http.post(this.url2 +'/cart', JSON.stringify(data) , httpOptions).pipe(
      catchError(this.handleError));
  }

  removeFromCart(data:any){
    console.log("Data inside rest remove from cart"+JSON.stringify(data));
    return this.http.post( this.url2 + '/cart_delete' , JSON.stringify(data) , httpOptions).pipe(
        catchError(this.handleError));
  }

  addToWishlist(data:any){
    console.log("Data inside rest remove from cart"+JSON.stringify(data));
    return this.http.post( this.url2 + '/wishlist' , JSON.stringify(data) , httpOptions).pipe(
        catchError(this.handleError));
  }

  viewCart(device_id,user_id){
    let data = {device_id:device_id, user_id:user_id};
    return this.http.post( this.url2+'/user_cart',JSON.stringify(data) ,httpOptions).pipe(
      catchError(this.handleError));
    
  }

  getFavStore(user_id,dev_id){
    console.log("Device id is" +dev_id);
    let data = {user_id:user_id,device_id:dev_id}
    return this.http.post( this.url2 + '/get_fav_shop', JSON.stringify(data) ,httpOptions).pipe(
      catchError(this.handleError));
  }

  viewWishlist(device_id,user_id){
    let data = {device_id:device_id, user_id:user_id};
    return this.http.post( this.url2+'/user_wishlist',JSON.stringify(data) ,httpOptions).pipe(
      catchError(this.handleError));
  }

   
  addFavStore(data:any){
    console.log('Data inside rest addFavStore' +JSON.stringify(data));

    return this.http.post( this.url2+'/fav_store',JSON.stringify(data) ,httpOptions)
          .pipe(
            catchError(this.handleError));

  }
  private extractData(res: Response) {
    let body = res;
    console.log('res is' + res);
    console.log('body is' + body);
    return body || [];
  }


  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}