  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { DialogModule } from 'primeng/dialog';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { SampleComponent } from './sample/sample.component';
  import { CategoryComponent } from './category/category.component';
  import { TableModule } from 'primeng/table';
  import { DataTableModule, InputTextareaModule, InputTextModule, ButtonModule, DropdownModule } from 'primeng/primeng';
  import { FormsModule } from '@angular/forms';
  import { ReactiveFormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';
  import { HttpClientModule } from '@angular/common/http';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { CustomerComponent } from './customer/customer.component';
  import { EmployeeComponent } from './employee/employee.component';
  import { CalendarModule } from 'primeng/calendar';
  import { MenuModule } from 'primeng/menu';
  import { CommonModule } from '@angular/common';
  import { ShipperComponent } from './shipper/shipper.component';
  import { WarehouseComponent } from './warehouse/warehouse.component';
  import { DriverComponent } from './driver/driver.component';
  import { AirportComponent } from './airport/airport.component';
  import { RadioButtonModule } from 'primeng/radiobutton';
  import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
  import { SupplierComponent } from './supplier/supplier.component';
  import { ProductComponent } from './product/product.component';
  import { OrderComponent } from './order/order.component';
  import { OrderDetailComponent } from './order/order-detail/order-detail.component';
  import {MatAutocompleteModule, MatButtonModule,MatButtonToggleModule, MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatNativeDateModule
  } from '@angular/material';
import { PersonComponent } from './person/person.component';
import {NgxMaskModule} from 'ngx-mask';
import { PositionComponent } from './position/position.component';


  @NgModule({
    declarations: [
      AppComponent,
      SampleComponent,
      CategoryComponent,
      CustomerComponent,
      EmployeeComponent,
      ShipperComponent,
      WarehouseComponent,
      DriverComponent,
      AirportComponent,
      SupplierComponent,
      ProductComponent,
      OrderComponent,
      OrderDetailComponent,
      PersonComponent,
      PositionComponent

    ],
    imports: [
      BrowserAnimationsModule,
      BrowserModule,
      AppRoutingModule,
      ButtonModule,
      TableModule,
      ReactiveFormsModule,
      DataTableModule,
      FormsModule,
      HttpModule,
      HttpClientModule,
      InputTextModule,
      DialogModule,
      InputTextareaModule,
      CalendarModule,
      MenuModule,
      CommonModule,
      MatInputModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatSortModule,
      MatTableModule,
      RadioButtonModule,
      DropdownModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatGridListModule,
      MatIconModule,
      MatListModule,
      MatMenuModule,
      MatProgressBarModule,
      MatRadioModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatStepperModule,
      MatNativeDateModule,
      NgxMaskModule,
      NgxMaskModule.forRoot()

    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
