import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';

  get product(): IProduct | null {
    // $$: Note that a getter is used here so that Angular's change detection service will always get the latest value
    return this.productService.currentProduct;
  }

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
  }

}
