import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "../domain/employee";

@Injectable()
export class EmployeeService {
    constructor(private http:HttpClient) {}

    getEmployee()
    {
        return this.http.get("https://localhost:44351/api/Employees")
            .toPromise()
            .then(data => { return data as Employee[] });
    }

    addEmployee(objectEntity: Employee)
    {
        return this.http.post("https://localhost:44351/api/Employees", objectEntity)
            .toPromise()
            .then(data => { return data as Employee });
    }
    editEmployee(id, objectEntity: Employee)
    {
        return this.http.put("https://localhost:44351/api/Employees/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Employee });
    }
    deleteEmployee(id) {
        return this.http.delete("https://localhost:44351/api/Employees/" + id)
        .toPromise()
        .then(data => null);

    }
    
}