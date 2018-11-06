import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { SingleRfpRoutes } from "./single-rfp.routing";
import { MaterialModule } from '../../app.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SingleRfpRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
       
    ],
    declarations: [
        // SingleRfpComponent,
        // ExtendedTableComponent,
        // RegularTableComponent
    ]
})

export class ProductsModule { }