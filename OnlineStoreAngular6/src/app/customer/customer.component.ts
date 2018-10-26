import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../services/customer.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  totalRecords: any;
  searchCompanyName: any;
  dataTable: any;
  customerForm: FormGroup;
  customerList: Customer[];
  selectCustomer: Customer;
  isAddCustomer: boolean;
  indexOfCustomer: number = 0;
  isDeleteCustomer: boolean;

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      'customerName': new FormControl('', Validators.required),
      'companyName': new FormControl('', Validators.required),
      'contactName': new FormControl('', Validators.required),
      'contactTitle': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'fax': new FormControl('', Validators.required)
    });
    this.loadAllCustomer();
  }

  paginate($event)
  {
    this.customerService.getCustomerPagination($event.first,$event.rows, this.searchCompanyName)
    .then(result => 
    {
      this.totalRecords = result.totalRecords;
      this.customerList = result.results;
    })
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

  }
  searchWarehouse()
    {
      if(this.searchCompanyName.length != 1)
      {
        this.resetTable();
      }
    }
    
    resetTable(){
      this.dataTable.reset();
    }


  loadAllCustomer() {
    this.customerService.getCustomer().then(result => {
      this.customerList = result;
    })
  }
  addCustomer() {
    this.customerForm.enable();
    this.selectCustomer = {} as Customer;
    this.isDeleteCustomer = false;
    this.isAddCustomer = true;
  }
  editCustomer(Customer) {

    this.customerForm.enable();
    this.isAddCustomer = false;
    this.indexOfCustomer = this.customerList.indexOf(Customer);
    this.selectCustomer = Customer;
    this.isDeleteCustomer = false;
    this.selectCustomer = Object.assign({}, this.selectCustomer);
  }
  deleteCustomer(Customer)
  {
    this.customerForm.disable();
    this.indexOfCustomer = this.customerList.indexOf(Customer);
    this.selectCustomer = Customer;
    this.isDeleteCustomer = true;
    this.selectCustomer = Object.assign({}, this.selectCustomer);
  }

  okDelete()
  {
    let tmpCustomerList = [... this.customerList];
    this.customerService.deleteCustomer(this.selectCustomer.customerID)
    .then(() =>{
      tmpCustomerList.splice(this.indexOfCustomer, 1);
      this.customerList = tmpCustomerList;
      this.selectCustomer = null;
    });
  }
  saveCustomer() {
    let tmpCustomerList = [...this.customerList];
    if (this.isAddCustomer === true) {
      this.customerService.addCustomer(this.selectCustomer).then(result => {
        tmpCustomerList.push(result);
        this.customerList = tmpCustomerList;
        this.selectCustomer = null;

      });
    }
    else {
      this.customerService.editCustomer(this.selectCustomer.customerID,
        this.selectCustomer).then(result => {
          tmpCustomerList[this.indexOfCustomer] = result;
          this.customerList = tmpCustomerList;
          this.selectCustomer = null;
        });
        
    }
    
  }
  cancelCustomer()
  {
    this.selectCustomer = null;
  }
  

}