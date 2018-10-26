import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OrderDetail } from "../domain/order-detail";


@Injectable()
export class OrderDetailService {
    constructor(private http:HttpClient) {}


    getOrderDetail()
    {
        return this.http.get("https://localhost:44351/api/OrderDetail")
            .toPromise()
            .then(data => { return data as OrderDetail[] });
    }

    getOrderDetailWithID(id)
    {
        return this.http.get("https://localhost:44351/api/OrderDetail/" + id)
            .toPromise()
            .then(data => { return data as OrderDetail });
    }


    addOrderDetail(objectEntity: OrderDetail)
    {
        return this.http.post("https://localhost:44351/api/OrderDetail", objectEntity)
            .toPromise()
            .then(data => { return data as OrderDetail });
    }
    editOrderDetail(id, objectEntity: OrderDetail)
    {
        return this.http.put("https://localhost:44351/api/OrderDetail/" + id, objectEntity)
            .toPromise()
            .then(data => { return data as OrderDetail });
    }
    deleteOrderDetail(id) {
        return this.http.delete("https://localhost:44351/api/OrderDetail/" + id)
        .toPromise()
        .then(data => null);

    }
    
}