import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from "../domain/order";


@Injectable()
export class OrderService {
    constructor(private http:HttpClient) {}


    getOrder()
    {
        return this.http.get("https://localhost:44351/api/order")
            .toPromise()
            .then(data => { return data as Order[] });
    }

    addOrder(objectEntity: Order)
    {
        return this.http.post("https://localhost:44351/api/order", objectEntity)
            .toPromise()
            .then(data => { return data as Order });
    }
    editOrder(id, objectEntity: Order)
    {
        return this.http.put("https://localhost:44351/api/order/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as Order });
    }
    deleteOrder(id) {
        return this.http.delete("https://localhost:44351/api/order/" + id)
        .toPromise()
        .then(data => null);

    }
    
}