import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customer } from "../domain/customer";

@Injectable()
export class CustomerService {
  getCustomerPagination(arg0: any, arg1: any, arg2: any): any {
    throw new Error("Method not implemented.");
  }
    constructor(private http:HttpClient) {}

    getCustomer()
    {
        return this.http.get("https://localhost:44351/api/Customers")
            .toPromise()
            .then(data => { return data as Customer[] });
    }

    addCustomer(objectEntity: Customer)
    {
        return this.http.post("https://localhost:44351/api/Customers", objectEntity)
            .toPromise()
            .then(data => { return data as Customer });
    }
    editCustomer(id, objectEntity: Customer)
    {
        return this.http.put("https://localhost:44351/api/Customers/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Customer });
    }
    deleteCustomer(id) {
        return this.http.delete("https://localhost:44351/api/Customers/" + id)
        .toPromise()
        .then(data => null);

    }
    
}