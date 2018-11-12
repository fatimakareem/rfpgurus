import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule,MatSelectModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
// import { AgmCoreModule } from '@agm/core';
import {BlackgeeksRecaptchaModule} from '../recaptcha/recaptcha.module';
import {RecaptchaModule} from 'ng-recaptcha';
const routes :Routes =[
  {
    path:'',component:LoginComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TextMaskModule,
    RecaptchaModule,
    // SocialLoginModule,
    BlackgeeksRecaptchaModule,
    RouterModule.forChild(routes)
  //   AgmCoreModule.forRoot({
  //     apiKey: 'AIzaSyDPnJ0zatoiPOI1GOeeS7HCj7AxIW183tg'
  // }),
  // RecaptchaModule.forRoot(),
 
  ],
  declarations: [LoginComponent],
  providers: [
    
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class LoginModule { }

