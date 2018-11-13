import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { PaymentmethodsService } from './paymentmethods.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { noSpaceValidator } from './noSpaceValidator.component';
import { RegisterService } from '../../registered/register.service';


@Component({
  selector: 'app-paymentmethods',
  templateUrl: './paymentmethods.component.html',
  styleUrls: ['./paymentmethods.component.scss'],
  // providers: [RegisterService,PaymentmethodsService]
})
export class PaymentmethodsComponent implements OnInit, OnDestroy {
  endRequest;
  public mask = [/[0-9]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  cardexist: boolean = false;
  form = new FormGroup({
    cardnumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    ccv: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    expirydate: new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$')
    ]),
    cardnickname: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required,
      // noSpaceValidator.cannotContainSpace,
      Validators.pattern('^[a-zA-Z _.]+$')
    ]),
    zip: new FormControl('', [
      Validators.maxLength(5),
      Validators.required,
      noSpaceValidator.cannotContainSpace,
      Validators.pattern('^[0-9]*$')
    ]),
    address: new FormControl('', [Validators.required
    ]),
    state: new FormControl('', [
      Validators.required,
    ]),
    city: new FormControl('', [
      Validators.required,
    ]),
    country: new FormControl('', [
      Validators.required,
    ]),
    // pin: new FormControl('', [
    //   Validators.maxLength(4),
    //   Validators.pattern('^[0-9]*$'),
    //   Validators.required,
    //   noSpaceValidator.cannotContainSpace
    // ]),
  });
  private productsSource;
  currentProducts;
  destroy_value;
  vin_Data = { "city": "", "state": "" };
  private sub: Subscription;
  flipclass = 'credit-card-box';
  constructor(private _nav: Router, private serv: PaymentmethodsService, private router: Router, private route: ActivatedRoute, private _serv: RegisterService) {
  }
  zipcodeCheck(zipcode1) {
    if (zipcode1.length > 4) {
      this.endRequest = this._serv.zipcode(zipcode1).subscribe(
        data => {
          this.form.controls['city'].setValue(data.city);
          this.form.controls['state'].setValue(data.state);
          this.form.controls['country'].setValue(data.country);
        },
        error => {
          // console.log(error)
        });
    }
  }
  ngOnInit() {
    this.getCards();
  }
  cardid = "";
  card;
  default: boolean = false;
  updefault;
  name;
  cardnumber;
  ccv;
  expirydate;
  address;
  zip;
  city;
  state;
  country;
  id;
  get(status, id, name, number, cvc, expDate, street_address, zipcode, city, state, country) {
    this.id = id;
    this.name = name;
    this.cardnumber = number;
    this.ccv = cvc;
    this.expirydate = expDate;
    // this.pin = pinCode;
    this.address = street_address;
    this.zip = zipcode;
    this.city = city;
    this.state = state;
    this.country = country;
    this.updefault = status;
  }
  updateSingleCard(status, name, updatecardnumber, updateccv, date, updateaddress, updatezip, updatecity, updatestate, updatecountry) {
    console.log(status)
    this.endRequest = this.serv.updateCard(status, this.id, name, updatecardnumber, updateccv, date, updateaddress, updatezip, updatecity, updatestate, updatecountry).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Credit Card Details Are Updated!',
        showConfirmButton: false,
        timer: 1500
      })
      this.getCards();
    },
      error => {
        if (error.status == 400) {
          swal({
            type: 'error',
            title: 'Credit Card Details Are Not Correct!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some Thing Went Worrng!',
            'error'
          )
        }
      })
  }
  deleteSingleCard(id) {
    this.endRequest = this.serv.deleteCard(id).subscribe(Data => {
      swal({
        type: 'success',
        title: 'Credit Card Is Deleted!',
        showConfirmButton: false,
        timer: 1500
      })
      this.getCards();
    },
      error => {
        if (error.status == 204) {
          swal({
            type: 'error',
            title: 'No Credit Card Found!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
        else {
          swal(
            'Sorry',
            'Some Thing Went Worrng!',
            'error'
          )
        }
      })
  }
  date;
  changed() {
    console.log(this.default)
  }
  add() {
    if (this.form.valid) {
      console.log(this.default)
      this.date = this.form.value['expirydate'];
      // this.date = moment(this.date).format('YYYY-MM') + '-01';
      // name,pin,address,zip,city,state,country,cardno, ccv, expiryDate
      this.endRequest = this.serv.addCard(this.default, this.form.value['cardnickname'], this.form.value['address'], this.form.value['zip'], this.form.value['city'], this.form.value['state'], this.form.value['country'], this.form.value['cardnumber'], this.form.value['ccv'], this.date).subscribe(Data => {
        swal({
          type: 'success',
          title: 'Payment Method Is Listed!',
          showConfirmButton: false,
          timer: 1500
        })
        this.form.reset({
          'cardnickname': '',
          'address': "",
          'zip': "",
          'state': "",
          'country': "",
          'cardnumber': "",
          'ccv': "",
          'default': this.default = false
        });
        this.getCards();
      },
        error => {
          if (error.status == 404) {
            swal({
              type: 'error',
              title: 'This Card Already Exist!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else if (error.status == 400) {
            swal({
              type: 'error',
              title: 'Please Enter Correct Details!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else if (error.status == 500) {
            swal(
              'Sorry',
              'Server Is Under Maintenance!',
              'error'
            )
          }
          else {
            swal(
              'Sorry',
              'Some Thing Went Worrng!',
              'error'
            )
          }
        })
    }
    else {
      swal({
        type: 'error',
        title: 'Please Enter Correct Details!',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  res;
  message;
  getCards() {
    this.endRequest = this.serv.showCards().subscribe(Data => {
      this.res = Data;
      this.message = Data.message;
    },
      error => {
        if (error.status == 404) {
          swal({
            type: 'error',
            title: 'Credit Card Not Found!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 500) {
          swal(
            'Sorry',
            'Server Is Under Maintenance!',
            'error'
          )
        }
      })
  }
  exist_card(card1) {
    // console.log("sdfsdfsdfsdfsdf",email1);
    this.serv.Atm_card_exist(card1).subscribe(
      data => {
        //  alert(data);
      },
      error => {
        if (error.status == 302) {
          // alert(this.cardexist)
          this.cardexist = true;
        }
        //  console.log("dsadas",error)
      }
    );

  }
  ngOnDestroy() {
    // this.serv.showCards();
  }
}