import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../services/product.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';
import { Supplier } from '../../domain/supplier';
import { SupplierService } from '../../services/supplier.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../domain/category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, SupplierService, CategoryService]
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  productList: Product[];
  selectProduct: Product;
  isAddProduct: boolean;
  indexOfProduct: number = 0;
  isDeleteProduct: boolean;
  totalRecords: number = 0;
  searchProductName:string = "";
  supplierList: Supplier[];
  selectSupplier:Supplier;
  categoryList: Category[];
  selectCategory: Category; 

  constructor(private productService: ProductService, private fb: FormBuilder,
  private supplierService: SupplierService,
  private categoryService: CategoryService) { }


  @ViewChild('dt') public dataTable:DataTable;
  ngOnInit() {
    this.productForm = this.fb.group({
      'productName': new FormControl('', Validators.required),
      'supplier': new FormControl('', Validators.required),
      'categoryName': new FormControl('', Validators.required),
      'unitPrice': new FormControl('', Validators.required),
      'unitStock': new FormControl('', Validators.required),
      'unitsOnOrder': new FormControl('', Validators.required),
      'reorderLevel': new FormControl('', Validators.required),
      'discontinued': new FormControl('', Validators.required),
    });
    //this.loadAllCategories();
  }
  loadAllProduct() {
    this.productService.getProduct().then(result => {
      this.productList = result;
    })
  }

  paginate($event)
  {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.categoryService.getCategory().then(categories =>{
      this.categoryList =categories;
      this.supplierService.getSupplier().then(suppliers =>{
        this.supplierList = suppliers;
        this.productService.getProductPagination($event.first,$event.rows, this.searchProductName)
        .then(result => {
          this.totalRecords = result.totalRecords;
          this.productList = result.results;
         
        for(var i = 0; i < this.productList.length; i++){
          this.productList[i].supplierName = this.supplierList.find(x => x.supplierID ==
          this.productList[i].supplierID).companyName; 
          this.productList[i].categoryName = this.categoryList .find(x => x.categoryID ==
          this.productList[i].categoryID).categoryName

         }
        });
      });
    });    
  }

  searchProduct()
    {
      if(this.searchProductName.length != 1)
      {
        this.resetTable();
      }
    }
    
    resetTable(){
      this.dataTable.reset();
    }

  addProduct() {
    this.productForm.enable();
    this.selectProduct = {} as Product;
    this.isDeleteProduct = false;
    this.isAddProduct = true;
    this.selectCategory = {} as Category;
    this.selectSupplier = {} as Supplier;
  }
  editProduct(Product) {

    this.productForm.enable();
    this.isAddProduct = false;
    this.indexOfProduct = this.productList.indexOf(Product);
    this.selectProduct = Product;
    this.isDeleteProduct = false;

    this.selectCategory = this.categoryList.find(x => x.categoryID == this.selectProduct.categoryID);
    this.selectSupplier = this.supplierList.find(x => x.supplierID == this.selectProduct.supplierID);
    this.selectProduct = Object.assign({}, this.selectProduct);
  }
  deleteProduct(Product)
  {
    this.productForm.disable();
    this.indexOfProduct = this.productList.indexOf(Product);
    this.selectProduct = Product;
    this.isDeleteProduct = true;

    this.selectCategory = this.categoryList.find(x => x.categoryID == this.selectProduct.categoryID);
    this.selectSupplier = this.supplierList.find(x => x.supplierID == this.selectProduct.supplierID);
    this.selectProduct = Object.assign({}, this.selectProduct);
  }

  okDelete()
  {
    let tmpProductList = [... this.productList];
    this.productService.deleteProduct(this.selectProduct.productID)
    .then(() =>{
      tmpProductList.splice(this.indexOfProduct, 1);
      this.productList = tmpProductList;
      this.selectProduct = null;
    });
  }
  saveProduct() {
    this.productForm.enable();
    this.selectProduct.supplierID = this.selectSupplier.supplierID;
    this.selectProduct.categoryID = this.selectCategory.categoryID;
    console.log(this.selectProduct.categoryID)
    
    let tmpProductList = [...this.productList];
    
    if (this.isAddProduct === true) {
      this.productService.addProduct(this.selectProduct).then(result => {
        console.log(result.categoryID)
        tmpProductList.push(result);
        this.productList = tmpProductList;
        this.selectProduct = null;

        for(var i = 0; i < this.productList.length; i++){
          this.productList[i].supplierName = this.supplierList.find(x => x.supplierID ==
          this.productList[i].supplierID).companyName;
          this.productList[i].categoryName = this.categoryList .find(x => x.categoryID ==
          this.productList[i].categoryID).categoryName;
         }

      });
    }
    else {
      this.productService.editProduct(this.selectProduct.productID,
        this.selectProduct).then(result => {
          tmpProductList[this.indexOfProduct] = result;
          this.productList = tmpProductList;
          this.selectProduct = null;
        });
        
    }
    
  }
  cancelProduct()
  {
    this.selectProduct = null;
  }
  

}