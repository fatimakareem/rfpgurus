import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';

@Injectable()
export class PaymentmethodsService {
  currentUser;
  constructor(private http: HttpService) {
   
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    }
  

  addCard(status,name,address,zip,city,state,country,cardno, ccv, expiryDate) {
    let header = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    header.append('Content-Type', 'application/json');
    return this.http.post('https://apis.rfpgurus.com/payment/cardinfo/',
      JSON.stringify({
        
         "default":status,
          "name": name,
         
          // "pinCode": pin,
          "street_address": address,
          "zipcode": zip,
          "city": city,
          "state": state,
          "country": country,
      
        "number": cardno,
        "cvc": ccv,
        "expDate": expiryDate,

      }),
      { headers: header }).map((response: Response) => response.json());
  }

  showCards() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://apis.rfpgurus.com/payment/cardinfo/', { headers: headers }).map((response: Response) => response.json());
  }
 
  updateCard(status,id,name,cardno,ccv, expiryDate,address,zip,city,state,country) {
    let header = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    header.append('Content-Type', 'application/json');
    return this.http.put('https://apis.rfpgurus.com/payment/cardinfo/',
      JSON.stringify({
        // "cardNumber": cardno,
        "default":status,
        "cid":id,
        "name": name,
         
        // "pinCode": pin,
        "street_address": address,
        "zipcode": zip,
        "city": city,
        "state": state,
        "country": country,
      "number": cardno,
      "cvc": ccv,
      "expDate": expiryDate,
      }),
      { headers: header }).map((response: Response) => response.json());
  }

  deleteCard(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
    headers.append('Content-Type', 'application/json');
    return this.http.delete('https://apis.rfpgurus.com/payment/cardinfodelete/' + id, { headers: headers }).map((response: Response) => response.json());
  }
 }