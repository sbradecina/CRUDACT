import { Component, OnInit, ViewChild } from '@angular/core';
import { Driver } from '../../domain/driver';
import { DriverService } from '../../services/driver.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [DriverService]
})
export class DriverComponent implements OnInit {
  driverForm: FormGroup;
  driverList: Driver[];
  selectDriver: Driver;
  isAddDriver: boolean;
  indexOfDriver: number = 0;
  isDeleteDriver: boolean;
  totalRecords: number = 0;
  searchDriverName:string = "";

  constructor(private driverService: DriverService, private fb: FormBuilder) { }


  @ViewChild('dt') public dataTable:DataTable;
  ngOnInit() {
    this.driverForm = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'middleName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'religion': new FormControl('', Validators.required),
      'licenseType': new FormControl('', Validators.required),
      'isActive': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required)

    });
    //this.loadAllCategories();
  }
  loadAllDriver() {
    this.driverService.getDriver().then(result => {
      this.driverList = result;
    })
  }

  paginate($event)
  {
    this.driverService.getDriverPagination($event.first,$event.rows, this.searchDriverName)
    .then(result => 
    {
      this.totalRecords = result.totalRecords;
      this.driverList = result.results;
    })
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

  }
  searchDriver()
    {
      if(this.searchDriverName.length != 1)
      {
        this.resetTable();
      }
    }
    
    resetTable(){
      this.dataTable.reset();
    }

  addDriver() {
    this.driverForm.enable();
    this.selectDriver = {} as Driver;
    this.isDeleteDriver = false;
    this.isAddDriver = true;
  }
  editDriver(Driver) {

    this.driverForm.enable();
    this.isAddDriver = false;
    this.indexOfDriver = this.driverList.indexOf(Driver);
    this.selectDriver = Driver;
    this.isDeleteDriver = false;
    this.selectDriver = Object.assign({}, this.selectDriver);
  }
  deleteDriver(Driver)
  {
    this.driverForm.disable();
    this.indexOfDriver = this.driverList.indexOf(Driver);
    this.selectDriver = Driver;
    this.isDeleteDriver = true;
    this.selectDriver = Object.assign({}, this.selectDriver);
  }

  okDelete()
  {
    let tmpDriverList = [... this.driverList];
    this.driverService.deleteDriver(this.selectDriver.driversID)
    .then(() =>{
      tmpDriverList.splice(this.indexOfDriver, 1);
      this.driverList = tmpDriverList;
      this.selectDriver = null;
    });
    
  }
  saveDriver() {
    //this.driverForm.enable();
    let tmpDriverList = [...this.driverList];
    if (this.isAddDriver == true){
      this.driverService.addDriver(this.selectDriver).then(result => {
        tmpDriverList.push(result);
        this.driverList = tmpDriverList;
        this.selectDriver = null;

      });
  }
    else {
      this.driverService.editDriver(this.selectDriver.driversID,
        this.selectDriver).then(result => {
          tmpDriverList[this.indexOfDriver] = result;
          this.driverList = tmpDriverList;
          this.selectDriver = null;
        });
        
    }
        
    }
    

  cancelDriver()
  {
    this.selectDriver = null;
  }
  

}