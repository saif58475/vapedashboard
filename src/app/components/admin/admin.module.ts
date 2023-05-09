
 
 

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
 
import { RouterModule } from '@angular/router';
 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPrintElementModule } from 'ngx-print-element';
 
import { NgApexchartsModule } from 'ng-apexcharts';
 

 

// **  
import {NgxPaginationModule} from 'ngx-pagination';

// cookie 
import { CookieService } from 'ngx-cookie-service'


import { DxReportViewerModule } from 'devexpress-reporting-angular';
import { ViewHotelsComponent } from './Hotels/view-hotels/view-hotels.component';
import { InsertHotelsComponent } from './Hotels/insert-hotels/insert-hotels.component';
import { ViewPlanesComponent } from './plane/view-planes/view-planes.component';
import { InsertPlanesComponent } from './plane/insert-planes/insert-planes.component';
import { ViewNightlifeComponent } from './night-life/view-nightlife/view-nightlife.component';
import { InsertNightlifeComponent } from './night-life/insert-nightlife/insert-nightlife.component';
import { ViewCarsComponent } from './cars/view-cars/view-cars.component';
import { InsertCarsComponent } from './cars/insert-cars/insert-cars.component';
import { ViewPackagesComponent } from './packages/view-packages/view-packages.component';
import { InsertPackagesComponent } from './packages/insert-packages/insert-packages.component';
import { ViewOrdersComponent } from './orders/view-orders/view-orders.component';
import { InsertOrdersComponent } from './orders/insert-orders/insert-orders.component';
import { InsertUserComponent } from './User/insert-user/insert-user.component';
import { ViewCafetableComponent } from './cafe-tables/view-cafetable/view-cafetable.component';
import { InsertCafetableComponent } from './cafe-tables/insert-cafetable/insert-cafetable.component';
import { FormsModule } from '@angular/forms';
import { InsertVacationComponent } from './vacation/insert-vacation/insert-vacation.component';
import { ViewVacationComponent } from './vacation/view-vacation/view-vacation.component';




 @NgModule({
  declarations: [
    ViewHotelsComponent,
    InsertHotelsComponent,
    ViewPlanesComponent,
    InsertPlanesComponent,
    ViewNightlifeComponent,
    InsertNightlifeComponent,
    ViewCarsComponent,
    InsertCarsComponent,
    ViewPackagesComponent,
    InsertPackagesComponent,
    ViewOrdersComponent,
    InsertOrdersComponent,
    InsertUserComponent,
    ViewCafetableComponent,
    InsertCafetableComponent,
    InsertVacationComponent,
    ViewVacationComponent,
    
  ],
  imports: [
    DxReportViewerModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module,
    NgxPaginationModule,
    RouterModule,
    NgApexchartsModule,
    NgxPrintElementModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
   CookieService
  ],
  
  exports:[FormsModule]
})
export class AdminModule { }
