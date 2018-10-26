import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "../domain/person";
import { PaginationResult } from "../domain/paginationResult";


@Injectable()
export class PersonService {
  
    constructor(private http:HttpClient) {}

    getPersonPagination(page: number, itemsPerPage: number, filter: string)
    {
        return this.http.get("https://localhost:44351/api/person/" + page + "/" + itemsPerPage + "?filter=" + filter)
            .toPromise()
            .then(data => { return data as PaginationResult<Person> });
    }

    getPerson()
    {
        return this.http.get("https://localhost:44351/api/person")
            .toPromise()
            .then(data => { return data as Person[] });
    }

    addPerson(objectEntity: Person)
    {
        return this.http.post("https://localhost:44351/api/person", objectEntity)
            .toPromise()
            .then(data => { return data as Person });
    }
    editPerson(id, objectEntity: Person)
    {
        return this.http.put("https://localhost:44351/api/person/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Person });
    }
    deletePerson(id) {
        return this.http.delete("https://localhost:44351/api/person/" + id)
        .toPromise()
        .then(data => null);

    }
    
}