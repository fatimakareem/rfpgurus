import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { PricingService } from './pricing.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

import { RfpService } from '../rfps/single-rfp/rfp.service';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricingsteps.component.scss'],
})
export class PricingComponent implements OnInit {
  /////////////////////////////card///////////////////////////
  public mask = [/\d/, /\d/, /\d/, /\d/];
  public mask1 = [/[a-zA-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/];
  cardnumber1;
  cardnumber2;
  cardnumber3;
  cardnumber4;
  cardholdername;
  expmonth;
  expyear;
  ccv;
  personal: any = [];
  flipclass = 'credit-card-box';
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step1class = 'active';
  step2class = '';
  step3class = '';
  authcode = '';
  fullname = '';
  pass = '';
  retypepass = '';
  passnotequal = false;
  email;
  pricepackage = [];
  user_id;
  payment_result;
  showresponse = false;
  loading = false;
  emailconfirmerror = false;
  other = false;
  free = false;
  pkg_detail = {};
  pkgsub = false;
  info = false;
  card = false;
  pkg;
  local;
  uname;

  /////////////////////////////end///////////////////////////

  constructor(private _serv1: RfpService,private _nav: Router, private _serv: PricingService, private http: Http) { }
  //
  next_stepdetail(event: any) {
    if (event.target.value == "BM") {
      this.prv_stepdetail("B", "M")

    } else if (event.target.value == "PY") {
      this.prv_stepdetail("P", "Y")
    }

  }
  valuee = '';
  firststep(value) {
    console.log(value)
    this.valuee = value;
    if (value == "BM") {
      this.prv_stepdetail("B", "M")

    }
    else if (value == "PY") {
      this.prv_stepdetail("P", "Y")
    }
  }

  prv_stepdetail(type, dur) {
    this.pkg_detail['type'] = type
    this.pkg_detail['dur'] = dur
    this.pkgsub = true;

  }

  ////////////////////////////////////Card Module//////////////////////////////////

  proceedstep1() {
    this.loading = true;
  }

  flip() {
    this.flipclass = 'credit-card-box hover';
  }

  flipagain() {
    this.flipclass = 'credit-card-box';
  }


  pay() {
    if (this.free) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://ns519750.ip-158-69-23.net:8100/cr/',
        JSON.stringify({
          email: this.email, pricepackage: this.pricepackage[0],
          duration: this.pricepackage[1]
        }), { headers: headers })
        .map((response: Response) => {

        });
    } else {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://ns519750.ip-158-69-23.net:8100/cr/',
        JSON.stringify({
          creditno: this.cardnumber1 + this.cardnumber2 +
            this.cardnumber3 + this.cardnumber4, exp: this.expmonth + '/' + this.expyear,
          ccv: this.ccv, name: this.cardholdername,
          id: this.user_id, pricepackage: this.pricepackage[0],
          duration: this.pricepackage[1]
        }), { headers: headers })
        .map((response: Response) => {

          this.payment_result = response.json();
          console.log(this.payment_result);
        });
    }
  }

  proceed() {
    this.pkg_detail['credit'] = this.cardnumber1 + this.cardnumber2 +
      this.cardnumber3 + this.cardnumber4
    this.pkg_detail['ccv'] = this.ccv
    this.pkg_detail['expdate'] = this.expmonth + '/' + this.expyear
    this.local = localStorage.getItem('currentUser');
    let pars = JSON.parse(this.local);
    this.uname = pars.username
    this._serv.package_free(this.uname, this.pkg_detail).subscribe(
      data => {

        swal(
          'Your payment has been transferred',
          '',
          'success'
        )
        // let url = 'find-bids';
        // this._nav.navigate([url]);

      },
      error => {
        // console.log(error);
        swal(
          'Oops...',
          'Something went wrong!',
          'error'
        )
      });

  }
  gotocreditcard() {
    this.emailconfirmerror = false;
    this.checkcode(this.authcode)
      .subscribe(
        data => {
          this.step1 = false;
          this.step2 = true;
          this.step1class = '';
          this.step2class = 'active';

        },
        error => {
          console.log(error);
          console.log(error);
          this.emailconfirmerror = true;
        });
  }

  checkcode(key) {
    console.log(key);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://ns519750.ip-158-69-23.net:8100/verify/email/',
      JSON.stringify({
        email: this.email,
        key: key
      }), { headers: headers })
      .map((response: Response) => {

      });
  }

  saveaccountdetail() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://ns519750.ip-158-69-23.net:8100/create/account/',
      JSON.stringify({
        email: this.email,
        name: this.fullname,
        password: this.pass
      }), { headers: headers })
      .map((response: Response) => {
        console.log(response);
        this.user_id = response.json().user_id;
        console.log(this.user_id);
      });
  }

  // step 2 done
  gotocheckout() {
    if (this.pass === this.retypepass) {
      if (this.free) {
        this.proceed();
        this.saveaccountdetail()
          .subscribe(
            data => { },
            error => {
              // this.loading = false;
            });
      } else {
        this.saveaccountdetail()
          .subscribe(
            data => {
              this.passnotequal = false;
              this.step2 = false;
              this.step3 = true;
              this.step2class = '';
              this.step3class = 'active';
              console.log('Account details submitted', true);
            },
            error => {
              // this.loading = false;
            });
      }

    } else {
      this.passnotequal = true;
    }
  }

  chkpass() {
    if (this.pass === this.retypepass) {
      this.passnotequal = false;
    }
  }

  ///////////////////////////////////END//////////////////////////////////////////
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username

      return false
    }
    else {
      return true
    }
  }
  res;
status;
get_card_number:number;
file;
get_card_value1;
get_card_value2;
get_card_value3;
get_card_value4;
ex_value1=[];
ex_get_value;
ex_month_value;
ex_year_value;
value_2;
subscribe;
  show_card_info() {
    this._serv1.usersubscribe(this.uname).subscribe(
      data =>{
        this.subscribe=data.Response
      //   console.log(data.Response);
       
    
    if (localStorage.getItem('currentUser') && this.subscribe!="Subscribe user") {
    return this._serv.get_card_info()
      .subscribe(response => {
        for (let i of response) {
          if (i.default) {
            this.status = i;
          }
        }
        this.get_card_number=this.status.number.toString();
        this.get_card_value1=this.get_card_number.toString().slice(0,4);
        this.get_card_value2=this.get_card_number.toString().slice(4,8);
        this.get_card_value3=this.get_card_number.toString().slice(8,12);
        this.get_card_value4=this.get_card_number.toString().slice(12,16);      
        this.cardnumber1=this.get_card_value1;
        this.cardnumber2=this.get_card_value2;
        this.cardnumber3=this.get_card_value3;
        this.cardnumber4=this.get_card_value4;     
        this.ex_get_value=this.status.expDate;
        this.ex_value1=this.ex_get_value.split("/");
        this.ex_month_value=this.ex_value1[0];
        this.ex_year_value=this.ex_value1[1];
        this.cardholdername=this.status.name;
        this.expmonth=this.ex_month_value;
        this.expyear=this.ex_year_value;
        this.ccv=this.status.cvc;
      })}  });
  }
  ngOnInit() {
    this.show_card_info();
  }
}
