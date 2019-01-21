import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { RecapchaService } from '../recapcha/recapcha.service';
 
declare var $: any;
declare interface ValidatorFn {
  (c: AbstractControl): {
    [key: string]: any;
  };
}
declare interface User {
  username?: string; // required, must be 5-8 characters
  email?: string; // required, must be valid email format
  password?: string; // required, value must be equal to confirm password.
  confirmPassword?: string; // required, value must be equal to password.
  number?: number; // required, value must be equal to password.
  url?: string;
  idSource?: string;
  idDestination?: string;
  optionsCheckboxes?: boolean;
  staySignedIn;
  e;
}

@Component({
  selector: 'app-superlogin',
  templateUrl: './superlogin.component.html',
  styleUrls: ['./superlogin.component.scss']
})
export class SuperloginComponent implements OnInit {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
  isCaptcha=false;
  statuslogin: any;
  public typeValidation: User;
  register: FormGroup;
  login: FormGroup;
  type: FormGroup;
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public username="admin";
  staySignedIn:boolean=true;
  e;
  i;
  hide=true;
user;
  password;
  status;
  islogin = true;
  isequal;
  
  constructor(public router: Router, private element: ElementRef, private http: Http, private route: ActivatedRoute, private _nav: Router, private formBuilder: FormBuilder,public recapcha: RecapchaService) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

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
  onLogin(e,username,password){
    
    if (this.recapcha.check()) {
      this.isequal=true;
    console.log(username,password);
    if(username == 'admin' && password =='admin123') {
    
    swal(
      'Successfully! Logged in',
      '',
      'success'
    )
    this.router.navigate(['/admin-panel']);
  
   
      localStorage.setItem('currentadmin', this.username);
      // console.log ("junaid",localStorage.getItem('currentUser'))
  }
   
  
           
          else{
            error => {
              console.log(error);
             // this.toastr.error(error, null, {toastLife: 5000});
              swal(
                'Invalid',
                'Username OR Password',
                'error'
              )
           
            };
            
          }


  }
  else {
    this.captcha.resetImg();
    // this.captcha.reset();
    // this.isequal = false;
    
    swal({
      type: 'error',
      title: 'Please confirm you are not a robot!',
      showConfirmButton: false,
      width: '512px',
      timer: 2000
    });

    // this.islogin = true;
  }
  if(this.staySignedIn == false){
    localStorage.setItem('signed', 'false');
    console.log(this.staySignedIn)
  }
 }
  
  checked(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.staySignedIn=true;
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        this.staySignedIn=false;

    }
   
}
  ngOnInit() {
  
  }
  

}
