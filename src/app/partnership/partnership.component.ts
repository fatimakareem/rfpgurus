import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { partnershipservice } from './partnership.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.css']
})

export class PartnershipComponent implements OnInit {
  formBuilder: any;
  var_Partner_description
  constructor(private pathnership_service : partnershipservice) { }
    var_get_data;
  partnership = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z _.]+$")
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
    cName: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z _.]+$")
    ]),
    Partner_description:new FormControl('',[
      Validators.required
    ])
    // des: new FormControl('',[
    //   Validators.required
    // ])
  });
  formclear() {
    this.partnership.controls.firstname = undefined;
    this.partnership.controls.email = undefined;
    this.partnership.controls.cName = undefined;
    this.partnership.controls.Partner_description = undefined;
  }
  onSubmit()
  {
    // this.var_Partner_description=this.Partner_description;
this.var_get_data=this.pathnership_service.fun_insert_value( this.partnership.controls.firstname.value,
  this.partnership.controls.email.value,
  this.partnership.controls.cName.value,this.partnership.controls.Partner_description.value).subscribe(
  data => {    console.log(data);
    swal({
      type: 'success',
      title: 'Successfully Logged in',
      showConfirmButton: false,
      timer: 1500
  });
  })
  }
get firstname(){
  return this.partnership.get('firstname');
}
get email(){
  return this.partnership.get('email');
}
get cName(){
  return this.partnership.get('cName');
}
  ngOnInit() {
  }
}