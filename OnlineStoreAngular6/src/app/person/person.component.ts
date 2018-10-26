import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../../domain/person';
import { PersonService } from '../../services/person.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
// import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
selector: 'app-person',
templateUrl: './person.component.html',
styleUrls: ['./person.component.css'],
providers: [PersonService, DatePipe]
})




export class PersonComponent implements OnInit {



personList: Person[];
selectPerson: Person;
personFormGroup: FormGroup;
isAddPerson: boolean;
indexOfPerson: number = 0;
isDeletePerson: boolean;
totalRecords: number = 0;
searchPersonName: string = "";
genders: string[] = ['Male', 'Female'];
birthDate: Date;
minDate = new Date(1900, 0, 1);
maxDate = new Date(Date.now());

constructor(private personService: PersonService, private fb: FormBuilder, private datePipe: DatePipe) { }


@ViewChild('dt') public dataTable: DataTable;
ngOnInit() {
this.personFormGroup = this.fb.group({
firstName: ['', Validators.required],
middleName: [''],
lastName: ['', Validators.required],
age: ['', Validators.required],
birthDate: ['', Validators.required],
photo: [''],
gender: ['', Validators.required],
relationshipStatus: ['', Validators.required],
nationality: ['', Validators.required],
phoneNumber: ['', Validators.required],
religion: [''],
street: ['', Validators.required],
barangay: [''],
city: ['', Validators.required],
region: ['', Validators.required],
country: ['', Validators.required],
postalCode: ['', Validators.required],
latitude: ['', Validators.required],
longitude: ['', Validators.required]
});


}

loadAllPersons() {
this.personService.getPerson().then(persons => {
this.personList = persons;

for (let i = 0; i < this.personList.length; i++) {
this.personList[i].birthDate =
this.datePipe.transform(this.personList[i].birthDate, 'yyyy-MM-dd');
}
});
}


paginate($event) {
this.personService.getPersonPagination($event.first, $event.rows, this.searchPersonName).then(result => {
this.totalRecords = result.totalRecords;
this.personList = result.results;

for (let i = 0; i < this.personList.length; i++) {
this.personList[i].birthDate=
this.datePipe.transform(this.personList[i].birthDate, 'yyyy-MM-dd');
}
})
}

searchPerson()
{
  if(this.searchPersonName.length != -1)
  {
    this.resetTable();
  }
}

resetTable(){
  this.dataTable.reset();
}

computeAge() {
var dateold = new Date(this.personFormGroup.value.birthDate);
var datenew = new Date(); 
var ynew = datenew.getFullYear();
var mnew = datenew.getMonth();
var dnew = datenew.getDate();
var yold = dateold.getFullYear();
var mold = dateold.getMonth();
var dold = dateold.getDate();
var diff = ynew - yold;
if (mold > mnew) diff--;
else {
if (mold == mnew) {
if (dold > dnew) diff--;
}
}
this.selectPerson.age = diff; 
this.dataTable.reset();
}

addPerson() {
this.personFormGroup.enable();
this.isDeletePerson = false;
this.isAddPerson = true;
this.selectPerson = {} as Person;
this.dataTable.reset();
}


editPerson(Person) {
this.personFormGroup.enable();
this.isAddPerson = false;
this.isDeletePerson = false;
this.indexOfPerson = this.personList.indexOf(Person);
this.selectPerson = Person;
this.selectPerson = Object.assign({}, this.selectPerson);


this.birthDate = new Date(this.selectPerson.birthDate);
this.dataTable.reset();
}

deletePerson(Person) {

this.personFormGroup.disable();
this.isDeletePerson = true;
this.indexOfPerson = this.personList.indexOf(Person);
this.selectPerson = Person;
this.selectPerson = Object.assign({}, this.selectPerson); 
this.dataTable.reset();
}

okDelete() {
let tmpPersonList = [...this.personList];
this.personService.deletePerson(this.selectPerson.personID)
.then(() => {
tmpPersonList.splice(this.indexOfPerson, 1);
this.personList = tmpPersonList;
this.selectPerson = null;
this.dataTable.reset();
});
}


savePerson() {
let tmpPersonList = [...this.personList];

this.selectPerson.birthDate =
this.datePipe.transform(this.selectPerson.birthDate, 'yyyy-MM-dd');

if (this.isAddPerson == true) {
  if(this.selectPerson.middleName == "" || this.selectPerson.middleName == null)
  {
    this.selectPerson.middleName = " ";
  }


    if(this.selectPerson.barangay == "" || this.selectPerson.barangay == null)
    {
      this.selectPerson.barangay = " ";
    }
  
this.personService.addPerson(this.selectPerson).then(result => {
result.birthDate =
this.datePipe.transform(this.selectPerson.birthDate, 'yyyy-MM-dd');

tmpPersonList.push(result);
this.personList = tmpPersonList;
this.selectPerson = null;
this.dataTable.reset();
});
}
else {
this.personService.editPerson(this.selectPerson.personID,
this.selectPerson).then(result => {

result.birthDate =
this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');

result.birthDate =
this.datePipe.transform(this.selectPerson.birthDate, 'yyyy-MM-dd');

tmpPersonList[this.indexOfPerson] = result;
this.personList = tmpPersonList;
this.selectPerson = null;
this.dataTable.reset();
});
}
}


cancelPerson() {
this.selectPerson = null;
this.dataTable.reset();
}
}