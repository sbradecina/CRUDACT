import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Supplier } from "../domain/supplier";

@Injectable()
export class SupplierService{
    constructor(private http: HttpClient) {}

    getSupplier() {
        return this.http.get("https://localhost:44351/api/Supplier")
                        .toPromise()
                        .then(data => { return data as Supplier[]});
    }

    addSupplier(objEntity: Supplier){
        return this.http.post("https://localhost:44351/api/Supplier", objEntity)
                        .toPromise()
                        .then(data => { return data as Supplier});
    }

    editSupplier(id, objEntity: Supplier){
        return this.http.put("https://localhost:44351/api/Supplier/" + id, objEntity)
                        .toPromise()
                        .then(data => { return data as Supplier});
    }

    deleteSupplier(id){
        return this.http.delete("https://localhost:44351/api/Supplier/" + id)
                        .toPromise()
                        .then(() => null);
    }
}