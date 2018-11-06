import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseRoutes } from './base.routing';
// import { BaseComponent } from './base.component';
// import {MatTableModule} from '@angular/material';
import {MaterialModule} from '../app.module';
// import { DataTableModule } from 'angular4-smart-table';
import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ngx-smart-table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BaseRoutes),
    FormsModule,
    MaterialModule,
    Ng2SmartTableModule,
    BrowserModule,
  ],
  
  declarations: [
   
  
   
  ],
  
  providers: [

  ]
})

export class BaseModule {}
