import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../domain/supplier';
import { SupplierService } from '../../services/supplier.service';
import { FormBuilder } from '@angular/forms';
import { Validators, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [SupplierService]
})
export class SupplierComponent implements OnInit {

  supplierList: Supplier[];
  selectSupplier: Supplier;
  supplierForms: FormGroup;
  isAddSupplier: boolean;
  indexOfSupplier: number = 0;
  isDeleteSupplier: boolean;

  constructor(private supplierService: SupplierService, private fb: FormBuilder) { }

  ngOnInit() {
    
    this.supplierForms = this.fb.group({
      'companyName': new FormControl('', Validators.required),
      'contactName': new FormControl('', Validators.required),
      'contactTitle': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'fax': new FormControl('', Validators.required),
      'homePage': new FormControl('', Validators.required)
    })

    this.loadAllSuppliers();
  }

  loadAllSuppliers(){
    this.supplierService.getSupplier().then(result => {
      this.supplierList = result;
      console.log(this.supplierList)
    })
  }

  addSupplier(){
    this.supplierForms.enable();
    this.isAddSupplier = true;
    this.isDeleteSupplier = false;
    this.selectSupplier = {} as Supplier;
  }

  editSupplier(Supplier){
    this.supplierForms.enable();
    this.isAddSupplier = false;
    this.isDeleteSupplier = false;
    this.indexOfSupplier = this.supplierList.indexOf(Supplier);
    this.selectSupplier = Supplier;
    this.selectSupplier = Object.assign({}, this.selectSupplier)
  }

  deleteSupplier(Supplier){
    this.supplierForms.disable();
    this.isDeleteSupplier = true;
    this.indexOfSupplier = this.supplierList.indexOf(Supplier);
    this.selectSupplier = Supplier;
    this.selectSupplier = Object.assign({}, this.selectSupplier)
  }

  okDelete(){
    let tmpSupplierList = [...this.supplierList];
    this.supplierService.deleteSupplier(this.selectSupplier.supplierID)
    .then(() => {
      tmpSupplierList.splice(this.indexOfSupplier, 1)
      this.supplierList = tmpSupplierList;
      this.selectSupplier = null;
    });
  }

  saveSupplier(){
    let tmpSupplierList = [...this.supplierList];
    this.selectSupplier.phone = parseInt(this.selectSupplier.phone + "");
    this.selectSupplier.postalCode = parseInt(this.selectSupplier.postalCode + "");
    if(this.isAddSupplier == true){
      this.supplierService.addSupplier(this.selectSupplier).then(result => {
        tmpSupplierList.push(result);
        this.supplierList = tmpSupplierList;
        this.selectSupplier = null;
      });
    } else{
      this.supplierService.editSupplier(this.selectSupplier.supplierID, this.selectSupplier)
        .then(result => {
        tmpSupplierList[this.indexOfSupplier] = result;
        this.supplierList = tmpSupplierList;
        this.selectSupplier = null;
      })
    }
  }

  cancelSupplier(){
    this.selectSupplier = null;
  }

}
