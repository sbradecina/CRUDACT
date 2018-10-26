import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SampleComponent } from './sample/sample.component';
import { EmployeeComponent } from './employee/employee.component';
import { CustomerComponent } from './customer/customer.component';
import { ShipperComponent } from './shipper/shipper.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { DriverComponent } from './driver/driver.component';
import { AirportComponent } from './airport/airport.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { PositionComponent } from './position/position.component';
import { PersonComponent } from './person/person.component';

const routes: Routes = [
  { path: '', redirectTo: '/category', pathMatch: 'full' },
  { path: 'category', component: CategoryComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'product', component: ProductComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'customer', component: CustomerComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'employee', component: EmployeeComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'order', component: OrderComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'supplier', component: SupplierComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'shipper', component: ShipperComponent },
  { path: 'sample', component: SampleComponent },

  

  { path: 'person', component: PersonComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'position', component: PositionComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'warehouse', component: WarehouseComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'driver', component: DriverComponent },
  { path: 'sample', component: SampleComponent },

  { path: 'airport', component: AirportComponent },
  { path: 'sample', component: SampleComponent }
];


  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }