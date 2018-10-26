import { Component, OnInit, ViewChild } from '@angular/core';
import { Warehouse } from '../../domain/warehouse';
import { WarehouseService } from '../../services/warehouse.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
  providers: [WarehouseService]
})
export class WarehouseComponent implements OnInit {
  warehouseForm: FormGroup;
  warehouseList: Warehouse[];
  selectWarehouse: Warehouse;
  isAddWarehouse: boolean;
  indexOfWarehouse: number = 0;
  isDeleteWarehouse: boolean;
  totalRecords: number = 0;
  searchWarehouseName:string = "";

  constructor(private warehouseService: WarehouseService, private fb: FormBuilder) { }


  @ViewChild('dt') public dataTable:DataTable;
  ngOnInit() {
    this.warehouseForm = this.fb.group({
      'warehouseName': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required),
      'itemNumber': new FormControl('', Validators.required),
      'isActiveItem': new FormControl('', Validators.required)

    });
    //this.loadAllCategories();
  }
  loadAllWarehouse() {
    this.warehouseService.getWarehouse().then(result => {
      this.warehouseList = result;
    })
  }

  paginate($event)
  {
    this.warehouseService.getWarehousePagination($event.first,$event.rows, this.searchWarehouseName)
    .then(result => 
    {
      this.totalRecords = result.totalRecords;
      this.warehouseList = result.results;
    })
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

  }
  searchWarehouse()
    {
      if(this.searchWarehouseName.length != 1)
      {
        this.resetTable();
      }
    }
    
    resetTable(){
      this.dataTable.reset();
    }

  addWarehouse() {
    this.warehouseForm.enable();
    this.selectWarehouse = {} as Warehouse;
    this.isDeleteWarehouse = false;
    this.isAddWarehouse = true;
  }
  editWarehouse(Warehouse) {

    this.warehouseForm.enable();
    this.isAddWarehouse = false;
    this.indexOfWarehouse = this.warehouseList.indexOf(Warehouse);
    this.selectWarehouse = Warehouse;
    this.isDeleteWarehouse = false;
    this.selectWarehouse = Object.assign({}, this.selectWarehouse);
  }
  deleteWarehouse(Warehouse)
  {
    this.warehouseForm.disable();
    this.indexOfWarehouse = this.warehouseList.indexOf(Warehouse);
    this.selectWarehouse = Warehouse;
    this.isDeleteWarehouse = true;
    this.selectWarehouse = Object.assign({}, this.selectWarehouse);
  }

  okDelete()
  {
    let tmpWarehouseList = [... this.warehouseList];
    this.warehouseService.deleteWarehouse(this.selectWarehouse.warehouseID)
    .then(() =>{
      tmpWarehouseList.splice(this.indexOfWarehouse, 1);
      this.warehouseList = tmpWarehouseList;
      this.selectWarehouse = null;
    });
    
  }
  saveWarehouse() {
    //this.warehouseForm.enable();
    let tmpWarehouseList = [...this.warehouseList];
    if (this.isAddWarehouse == true){
      this.warehouseService.addWarehouse(this.selectWarehouse).then(result => {
        tmpWarehouseList.push(result);
        this.warehouseList = tmpWarehouseList;
        this.selectWarehouse = null;

      });
  }
    else {
      this.warehouseService.editWarehouse(this.selectWarehouse.warehouseID,
        this.selectWarehouse).then(result => {
          tmpWarehouseList[this.indexOfWarehouse] = result;
          this.warehouseList = tmpWarehouseList;
          this.selectWarehouse = null;
        });
        
    }
        
    }
    

  cancelWarehouse()
  {
    this.selectWarehouse = null;
  }
  

}