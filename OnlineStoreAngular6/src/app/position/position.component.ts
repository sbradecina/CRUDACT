import { Component, OnInit, ViewChild } from '@angular/core';
import { Position } from '../../domain/position';
import { PositionService } from '../../services/position.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
  providers: [PositionService, DatePipe]
})
export class PositionComponent implements OnInit {
  dateCreated: Date;
  positionForm: FormGroup;
  positionList: Position[];
  selectPosition: Position;
  isAddPosition: boolean;
  indexOfPosition: number = 0;
  isDeletePosition: boolean;
  totalRecords: number = 0;
  searchPositionName:string = "";
  isActive: boolean;
  
minDate = new Date(Date.now());
maxDate = new Date(Date.now());
  

  constructor(private positionService: PositionService, private fb: FormBuilder,  private datePipe: DatePipe ) { }


  @ViewChild('dt') public dataTable:DataTable;
  ngOnInit() {
    this.positionForm = this.fb.group({
      'positionName': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
      'isActive': new FormControl('', Validators.required),
      'dateCreated': new FormControl('', Validators.required)
      
    });
    //this.loadAllPosition();
  }
  loadAllPosition() {
    this.positionService.getPosition().then(result => {
      this.positionList = result;
      for (let i = 0; i < this.positionList.length; i++) {
        this.positionList[i].dateCreated =
        this.datePipe.transform(this.positionList[i].dateCreated, 'yyyy-MM-dd');
        }
        });
        }

  paginate($event)
  {
    this.positionService.getPositionPagination($event.first,$event.rows, this.searchPositionName)
    .then(result => 
    {
      this.totalRecords = result.totalRecords;
      this.positionList = result.results;


      for (let i = 0; i < this.positionList.length; i++) {
        this.positionList[i].dateCreated=
        this.datePipe.transform(this.positionList[i].dateCreated, 'yyyy-MM-dd');
        }
        })
        }

  searchPosition()
    {
      if(this.searchPositionName.length != 1)
      {
        this.resetTable();
      }
    }
    
    resetTable(){
      this.dataTable.reset();
    }

  addPosition() {
    this.positionForm.enable();
    this.selectPosition = {} as Position;
    this.isDeletePosition = false;
    this.isAddPosition = true;
    
    
  }
  editPosition(Position) {
    
    
    this.positionForm.enable();
    this.isAddPosition = false;

    this.indexOfPosition = this.positionList.indexOf(Position);
    this.selectPosition = Position;
    this.isDeletePosition = false;
    this.isActive = this.selectPosition.isActive;
    this.selectPosition = Object.assign({}, this.selectPosition);

    
this.dateCreated = new Date(this.selectPosition.dateCreated);
this.dataTable.reset();
  }
  deletePosition(Position)
  {
    this.positionForm.disable();
    this.indexOfPosition = this.positionList.indexOf(Position);
    this.selectPosition = Position;
    this.isDeletePosition = true;
    this.selectPosition = Object.assign({}, this.selectPosition);
  }

  okDelete()
  {
    let tmpPositionList = [... this.positionList];
    this.positionService.deletePosition(this.selectPosition.positionID)
    .then(() =>{
      tmpPositionList.splice(this.indexOfPosition, 1);
      this.positionList = tmpPositionList;
      this.selectPosition = null;
    });
  }
  savePosition() {
    let tmpPositionList = [...this.positionList];
    
    this.selectPosition.dateCreated =
    this.datePipe.transform(this.selectPosition.dateCreated, 'yyyy-MM-dd');

    if (this.isAddPosition == true) {
      
      
    this.positionService.addPosition(this.selectPosition).then(result => {
    result.dateCreated =
    this.datePipe.transform(this.selectPosition.dateCreated, 'yyyy-MM-dd');
    
    tmpPositionList.push(result);
    this.positionList = tmpPositionList;
    this.selectPosition = null;
    this.dataTable.reset();
    });
    }
    else {
    this.positionService.editPosition(this.selectPosition.positionID,
    this.selectPosition).then(result => {
    
    result.dateCreated =
    this.datePipe.transform(this.dateCreated, 'yyyy-MM-dd');
    
    result.dateCreated =
    this.datePipe.transform(this.selectPosition.dateCreated, 'yyyy-MM-dd');
    
    tmpPositionList[this.indexOfPosition] = result;
    this.positionList = tmpPositionList;
    this.selectPosition = null;
    this.dataTable.reset();
    });
    }
    }
    
  cancelPosition()
  {
    this.selectPosition = null;
  }
  

}