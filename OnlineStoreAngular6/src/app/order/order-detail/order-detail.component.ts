import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OrderDetail } from '../../../domain/order-detail';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../domain/product';
import { OrderDetailService } from '../../../services/order-details.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  productID: any;
  selectOrderDetail: OrderDetail = {} as OrderDetail;
  productList: Product[];

  constructor(private fb: FormBuilder, private productSevice: ProductService,
    private orderDetailService: OrderDetailService) { }
  @Input() orderDetailFormGroup: FormGroup;
  @Input() orderID: string;

  ngOnInit() {
    this.loadAllProducts();
  }
  loadAllProducts() {
    this.productSevice.getProduct().then(products => {
      this.productList = products;
      if (this.orderID) {
        this.orderDetailService.getOrderDetailWithID(this.orderID).then(result => {
          this.selectOrderDetail = result;
          this.productID = this.selectOrderDetail.productID;
        })
      }
    })
  }
}
