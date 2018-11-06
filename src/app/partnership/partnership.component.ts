import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.css']
})

export class PartnershipComponent implements OnInit {
  formBuilder: any;

  constructor() { }
  textonly = '[a-zA-Z]+';
  // isFieldValid(form: FormGroup, field: string) {
  //   return !form.get(field).valid && form.get(field).touched;
  // }
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
  });

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