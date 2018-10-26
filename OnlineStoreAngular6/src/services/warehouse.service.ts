import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Warehouse } from "../domain/warehouse";
import { PaginationResult } from "../domain/paginationResult";


@Injectable()
export class WarehouseService {
    constructor(private http:HttpClient) {}

    getWarehousePagination(page: number, itemsPerPage: number, filter: string)
    {
        return this.http.get("https://localhost:44351/api/Warehouse/" + page + "/" + itemsPerPage + "?filter=" + filter)
            .toPromise()
            .then(data => { return data as PaginationResult<Warehouse> });
    }

    getWarehouse()
    {
        return this.http.get("https://localhost:44351/api/Warehouse")
            .toPromise()
            .then(data => { return data as Warehouse[] });
    }

    addWarehouse(objectEntity: Warehouse)
    {
        return this.http.post("https://localhost:44351/api/Warehouse", objectEntity)
            .toPromise()
            .then(data => { return data as Warehouse });
    }
    editWarehouse(id, objectEntity: Warehouse)
    {
        return this.http.put("https://localhost:44351/api/Warehouse/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Warehouse });
    }
    deleteWarehouse(id) {
        return this.http.delete("https://localhost:44351/api/Warehouse/" + id)
        .toPromise()
        .then(data => null);

    }
    
}