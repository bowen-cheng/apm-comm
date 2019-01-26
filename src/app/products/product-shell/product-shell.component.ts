import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  protected pageTitle: string = 'Products';
  protected monthCount: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.productChanges$.subscribe(
      (selectedProduct: IProduct | null) => {
        if (selectedProduct) {
          const releaseDate = new Date(selectedProduct.releaseDate);
          const now = new Date();
          this.monthCount = (now.getMonth() - releaseDate.getMonth())
            + 12 * (now.getFullYear() - releaseDate.getFullYear());
        } else {
          this.monthCount = 0;
        }
      });
  }

}
