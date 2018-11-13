import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllnotificationComponent } from './allnotification.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '', component: AllnotificationComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllnotificationComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AllnotificationModule { }