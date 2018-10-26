import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../domain/category";
import { PaginationResult } from "../domain/paginationResult";


@Injectable()
export class CategoryService {
    constructor(private http:HttpClient) {}

    getCategoryPagination(page: number, itemsPerPage: number, filter: string)
    {
        return this.http.get("https://localhost:44351/api/Categories/" + page + "/" + itemsPerPage + "?filter=" + filter)
            .toPromise()
            .then(data => { return data as PaginationResult<Category> });
    }

    getCategory()
    {
        return this.http.get("https://localhost:44351/api/Categories")
            .toPromise()
            .then(data => { return data as Category[] });
    }

    addCategory(objectEntity: Category)
    {
        return this.http.post("https://localhost:44351/api/Categories", objectEntity)
            .toPromise()
            .then(data => { return data as Category });
    }
    editCategory(id, objectEntity: Category)
    {
        return this.http.put("https://localhost:44351/api/Categories/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Category });
    }
    deleteCategory(id) {
        return this.http.delete("https://localhost:44351/api/Categories/" + id)
        .toPromise()
        .then(data => null);

    }
    
}