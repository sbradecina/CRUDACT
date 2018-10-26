import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Shipper } from "../domain/shipper";

@Injectable()
export class ShipperService {
    getShipperPagination(arg0: any, arg1: any, arg2: any): any {
        throw new Error("Method not implemented.");
    }
    constructor(private http:HttpClient) {}

    getShipper()
    {
        return this.http.get("https://localhost:44351/api/Shipper")
            .toPromise()
            .then(data => { return data as Shipper[] });
    }

    addShipper(objectEntity: Shipper)
    {
        return this.http.post("https://localhost:44351/api/Shipper", objectEntity)
            .toPromise()
            .then(data => { return data as Shipper });
    }
    editShipper(id, objectEntity: Shipper)
    {
        return this.http.put("https://localhost:44351/api/Shipper/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Shipper });
    }
    deleteShipper(id) {
        return this.http.delete("https://localhost:44351/api/Shipper/" + id)
        .toPromise()
        .then(data => null);

    }
    
}