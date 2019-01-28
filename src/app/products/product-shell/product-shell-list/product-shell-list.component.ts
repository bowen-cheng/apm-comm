import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IProduct } from '../../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  protected pageTitle: string = 'Products';
  protected errorMessage: string;
  protected products: IProduct[];
  protected selectedProduct: IProduct | null;
  // $$: Note that this subscription object is created explicitly.
  // This is because getProducts().subscribe(...) and productChanges$.subscribe(...) has no hierarchical relationships
  // Hierarchical relationships explained: https://blog.angularindepth.com/rxjs-composing-subscriptions-b53ab22f1fd5
  protected sub: Subscription = new Subscription();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    // $$: The two subscriptions has the same parent subscription
    this.sub.add(this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = error as any
    ));

    // $$: Subscribe to the BehaviorSubject to receive current values and any new values
    this.sub.add(this.productService.productChanges$.subscribe(
      (product: IProduct | null) => {
        this.selectedProduct = product;
      }));
  }

  OnProductSelect(product: IProduct) {
    // $$: Push the change to the state management service
    // this.productService.currentProduct = product;

    // $$: Push the change to the subject, it will then automatically update all the subscribers
    this.productService.changeSelectedProduct(product);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
