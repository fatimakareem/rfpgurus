import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';
import { ProfileService} from './profile.service';
import {  Router} from '@angular/router';
import {MainService} from '../../serv/main.service';
import {DatePipe} from '@angular/common';
import { AuthService } from "angular4-social-login";
import {AdvanceService} from '../../advance-search/advance.service';
declare const $:any;
declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}
declare interface User {
    text?: string; // required, must be 5-8 characters
    email?: string; // required, must be valid email format
    password?: string; // required, value must be equal to confirm password.
    confirmPassword?: string; // required, value must be equal to password.
    number?: number; // required, value must be equal to password.
    url?: string;
    idSource?: string;
    idDestination?: string;
    optionsCheckboxes?: boolean;

    // firstname?: string;
}
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
 providers: [AdvanceService,AuthService,ProfileService,MainService]
})
export class ProfileComponent implements OnInit,OnDestroy {
    endRequest;
    today: number = Date.now();
    UserPreference: any = [];
    tempUserPreference: any = [];
    record = [];
    result: boolean =false;
    public typeValidation: User;
    register : FormGroup;
    emailVerify : FormGroup;
    login : FormGroup;
    type : FormGroup;
    pkgsub = false;
    profile: any= [];
    personal : any = [];
    local;
    options: FormGroup;
    cat;
    uname;
    usernameexist;
    vin_Data = { "city": "", "state": "" };
    emailexist;
    digitsOnly = '^[0-9,-]+$';
    public phoneMask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    constructor(private authService: AuthService,private _nav:Router,private _serv: ProfileService,private datePipe: DatePipe,private formBuilder: FormBuilder ,private _adserv: AdvanceService,private _ser: MainService) {
        if (localStorage.getItem('currentUser')) {
            this.local = localStorage.getItem('currentUser');
            let pars = JSON.parse(this.local) ;
            this.uname = pars.username
           this.endRequest= this._serv.get_profile(this.uname).subscribe(
                data => {
                    console.log('Profile Data issssss', data);
                    console.log(data.user);
                    this.personal = data;
                    this.profile = data.user;
                    if (data['user_preference'] == null) {
                        this.UserPreference = [];
                    } else {
                        this.UserPreference = data['user_preference'];
                        this.tempUserPreference = this.UserPreference.slice();
                    }


                    console.log('UserPreference isss', this.UserPreference);
                },
                error => {
                    // console.log(error);
                });
        }
        this.options = formBuilder.group({
            bottom: 0,
            fixed: false,
            top: 0
        });
    }
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }
    zipcodeCheck(zipcode1) {
        if (zipcode1.length > 4) {
          this.endRequest= this._serv.zipcode(zipcode1).subscribe(
                data => {
                    this.personal['city'] = data.city
                    this.personal['state'] = data.state
this.personal['country']=data.country

                },
                error => {
                    // console.log(error)
                });
        }
    }
    usernameCheck(username1)
    {
       this.endRequest= this._serv.username_exist(username1).subscribe
        (
            data => {
                this.usernameexist = data;
                // console.log(data);
            },
            error =>{
                //  console.log(error)
            }
        );




    }
    emailCheck(email1)
    {

       this.endRequest= this._serv.email_exist(email1).subscribe
        (
            data => {
                this.emailexist = data;
            },
            error =>{
                //  console.log(error)
            }
        );




    }

    onRegister() {
        if (this.register.valid) {
            let nulllist;
            this.UserPreference = this.tempUserPreference;
            if (this.UserPreference.length == 0) {
               nulllist = null
            }
            console.log("ajakkkkkk", this.UserPreference,nulllist)
               this.endRequest= this._serv.ProfileUpdate(this.register.value, this.UserPreference,nulllist).subscribe(
                    data => {
                        swal({
                            type: 'success',
                            title: 'Updated Your Profile',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        // let url = 'find-bids';
                        // this._nav.navigate([url]);
                    },
                    error => {
                        // console.log(error)
                    });
            } else {
                this.validateAllFormFields(this.register);
                swal(
                    'Oops...',
                    'Failed to Update Profile. Inccorrect Information!',
                    'error'
                )
            }

    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            // console.log(field);
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }


    mainFunction(){
       this.endRequest= this._ser.purchaseHistory().subscribe(
            data => {
                this.record = data;
                this.result = true;
                var enddate = this.record[0].end_date.toString();
                var date  = new Date();
                var currentDate = this.datePipe.transform(date,"yyyy-MM-dd").toString()

                if(enddate <= currentDate && this.record[0].is_paid == true ){

                  this.endRequest= this._ser.expirePackage(enddate).subscribe(data =>{
                        if( data == true){
                            this.record[0].is_paid = false;
                            swal(
                                'Subscription',
                                'Your package has been expired.',
                                'success'
                            )
                        }
                        console.log(data)
                    },error => {
                        console.log(error)
                    })

                }

                // console.log(newdate)
                console.log(this.datePipe.transform(date,"yyyy-MM-dd"),this.today,this.record[0].end_date)
            },
            error => {
                console.log(error)
            })
    }

    ngOnInit() {
        this.emailVerify = this.formBuilder.group({
            code: ['', Validators.required]
        });
        this.register = this.formBuilder.group({
            firstname: ['', Validators.compose([Validators.required])],
            lastname: ['', Validators.compose([Validators.required])],
            companyname: ['', Validators.compose([Validators.required])],
            address: ['', Validators.compose([Validators.required])],
            username: ['', Validators.required],
            zipcode: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            phone: ['', Validators.compose([Validators.required])],
            newsletter: ['', Validators.required],
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            email: [{value: '', disabled: true}, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            // optionsCheckboxes: ['', Validators.required],
            // password: ['', Validators.required],
            // confirmPassword: ['', Validators.required],
        },

        );
       this.endRequest= this._adserv.rfpcategory().subscribe(
            data => {
                this.cat = data;
                // console.log(data);
            },
            error => {
                // console.log(error);
            }
        )
        $('#click_advance').click(function() {
            $("i", this).toggleClass("fa-arrow-left fa-arrow-right");
        });




    }
    valueSelected(preference, status) {

        console.log(status.currentTarget.checked);
        if (status.currentTarget.checked) {
            this.tempUserPreference.push(preference);
            console.log('zikikiki', this.tempUserPreference);
        } else {
            this.tempUserPreference.pop(preference);
            console.log('zak', this.tempUserPreference);
        }
    }
    logout() {
        this.authService.signOut();
        localStorage.clear();

        swal({
            type: 'success',
            title: 'Successfully Logged out',
            showConfirmButton: false,
            timer: 1500
        });

        this._nav.navigate(['/']);
    }
    ngOnDestroy(){
        this.endRequest.unsubscribe();
    }

}