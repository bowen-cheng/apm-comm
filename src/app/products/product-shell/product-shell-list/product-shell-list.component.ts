import { Component, OnInit } from '@angular/core';

import { IProduct } from '../../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit {
  protected pageTitle: string = 'Products';
  protected errorMessage: string;
  protected products: IProduct[];
  protected selectedProduct: IProduct | null;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = error as any
    );

    // $$: Subscribe to the BehaviorSubject to receive current values and any new values
    this.productService.productChanges$.subscribe(
      (product: IProduct | null) => {
        this.selectedProduct = product;
      });
  }

  OnProductSelect(product: IProduct) {
    // $$: Push the change to the state management service
    // this.productService.currentProduct = product;

    // $$: Push the change to the subject, it will then automatically update all the subscribers
    this.productService.changeSelectedProduct(product);
  }

}
