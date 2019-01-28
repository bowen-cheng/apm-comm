import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
  protected pageTitle: string = 'Product Detail';
  protected product: IProduct | null;
  protected sub: Subscription;

  /*
  get product(): IProduct | null {
    // $$: Note that a getter is used here so that Angular's change detection service will always get the latest value
    return this.productService.currentProduct;
  }
  */

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    // $$: Subscribe to productChanges to get notified and automatically get the latest selected product
    this.sub = this.productService.productChanges$.subscribe(
      (selectedProduct: IProduct | null) => {
        this.product = selectedProduct;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
