// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { PaymentmethodsComponent } from './paymentmethods.component';
// import { Routes, RouterModule} from '@angular/router';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MatInputModule, MatFormFieldModule,MatSelectModule } from '@angular/material';
// import { TextMaskModule } from 'angular2-text-mask';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import {XHRBackend, RequestOptions} from '@angular/http';
// import { PreloaderService } from 'app/serv/preloader-service';
// import {BaseRequestOptions} from '@angular/http';
// import { HttpService } from 'app/serv/http-service';

// const routes :Routes =[
//   {
//     path:'',component:PaymentmethodsComponent
//   }
// ]
// export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
//     return new HttpService(backend, defaultOptions, preloaderService);
// }
// @NgModule({
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     FormsModule,
//     MatInputModule,
//     MatFormFieldModule,
//     MatSelectModule,
//     Ng2SearchPipeModule,
//     TextMaskModule,
//     RequestOptions,
//     BaseRequestOptions,
//     XHRBackend,
//     RouterModule.forChild(routes)
//   ],
//   declarations: [PaymentmethodsComponent],
//   schemas: [
//     CUSTOM_ELEMENTS_SCHEMA
// ]

// })
// export class PaymentmethodsModule { }
