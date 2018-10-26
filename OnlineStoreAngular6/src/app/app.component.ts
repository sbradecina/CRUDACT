import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItems: MenuItem[];


  ngOnInit(): void {
    this.menuItems = [  
    { label: "Category", icon: "fa fa-calendar", routerLink: ['/category']},
      { label: "Employee", icon: "fa fa-group", routerLink: ['/employee'] },
      { label: "Product", icon: "fa fa-gift", routerLink: ['/product'] },
      { label: "Customer", icon: "fa fa-user", routerLink: ['/customer'] },
      { label: "Supplier", icon: "fa fa-street-view", routerLink: ['/supplier'] },
      { label: "Person", icon: "fa fa-user-secret ", routerLink: ['/person'] },
      { label: "Order", icon: "fa fa-folder-o", routerLink: ['/order'] },
      { label: "Position", icon: "fa fa-user-secret ", routerLink: ['/position'] },
      { label: "Shipper", icon: "fa fa-truck", routerLink: ['/shipper'] },
      { label: "Warehouse", icon: "fa fa-building", routerLink: ['/warehouse'] },
      { label: "Driver", icon: "fa fa-taxi", routerLink: ['/driver'] },
      { label: "Airport", icon: "fa fa-plane", routerLink: ['/airport'] },
     
      
  ]
  }
}
