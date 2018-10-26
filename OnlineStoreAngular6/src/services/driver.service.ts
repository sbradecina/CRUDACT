import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Driver } from "../domain/driver";
import { PaginationResult } from "../domain/paginationResult";


@Injectable()
export class DriverService {
    constructor(private http:HttpClient) {}

    getDriverPagination(page: number, itemsPerPage: number, filter: string)
    {
        return this.http.get("https://localhost:44351/api/Drivers/" + page + "/" + itemsPerPage + "?filter=" + filter)
            .toPromise()
            .then(data => { return data as PaginationResult<Driver> });
    }

    getDriver()
    {
        return this.http.get("https://localhost:44351/api/drivers")
            .toPromise()
            .then(data => { return data as Driver[] });
    }

    addDriver(objectEntity: Driver)
    {
        return this.http.post("https://localhost:44351/api/drivers", objectEntity)
            .toPromise()
            .then(data => { return data as Driver });
    }
    editDriver(id, objectEntity: Driver)
    {
        return this.http.put("https://localhost:44351/api/drivers/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Driver });
    }
    deleteDriver(id) {
        return this.http.delete("https://localhost:44351/api/drivers/" + id)
        .toPromise()
        .then(data => null);

    }
    
}