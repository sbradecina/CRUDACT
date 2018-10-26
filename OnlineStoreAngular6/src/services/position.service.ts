import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Position } from "../domain/position";
import { PaginationResult } from "../domain/paginationResult";


@Injectable()
export class PositionService {
    constructor(private http:HttpClient) {}

    getPositionPagination(page: number, itemsPerPage: number, filter: string)
    {
        return this.http.get("https://localhost:44351/api/Position/" + page + "/" + itemsPerPage + "?filter=" + filter)
            .toPromise()
            .then(data => { return data as PaginationResult<Position> });
    }

    getPosition()
    {
        return this.http.get("https://localhost:44351/api/Position")
            .toPromise()
            .then(data => { return data as Position[] });
    }

    addPosition(objectEntity: Position)
    {
        return this.http.post("https://localhost:44351/api/Position", objectEntity)
            .toPromise()
            .then(data => { return data as Position });
    }
    editPosition(id, objectEntity: Position)
    {
        return this.http.put("https://localhost:44351/api/Position/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Position });
    }
    deletePosition(id) {
        return this.http.delete("https://localhost:44351/api/Position/" + id)
        .toPromise()
        .then(data => null);

    }
    
}