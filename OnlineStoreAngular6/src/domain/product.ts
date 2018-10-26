export interface Product
{
    productID: string;
    productName: string;
    supplierID: string;
    supplierName: string;
    categoryID:string;
    categoryName: string;
    unitPrice: number;
    unitStock:number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued:boolean;

}