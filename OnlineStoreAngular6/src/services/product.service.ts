import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../domain/product";
import { PaginationResult } from "../domain/paginationResult";


@Injectable()
export class ProductService {
    constructor(private http:HttpClient) {}

    getProductPagination(page: number, itemsPerPage: number, filter: string)
    {
        return this.http.get("https://localhost:44351/api/Product/" + page + "/" + itemsPerPage + "?filter=" + filter)
            .toPromise()
            .then(data => { return data as PaginationResult<Product> });
    }

    getProduct()
    {
        return this.http.get("https://localhost:44351/api/product")
            .toPromise()
            .then(data => { return data as Product[] });
    }

    addProduct(objectEntity: Product)
    {
        return this.http.post("https://localhost:44351/api/product", objectEntity)
            .toPromise()
            .then(data => { return data as Product });
    }
    editProduct(id, objectEntity: Product)
    {
        return this.http.put("https://localhost:44351/api/product/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Product });
    }
    deleteProduct(id) {
        return this.http.delete("https://localhost:44351/api/product/" + id)
        .toPromise()
        .then(data => null);

    }
    
}