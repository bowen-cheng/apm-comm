import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CriteriaComponent } from '../../shared/criteria/criteria.component';

import { IProduct } from '../product';
import { ProductParameterService } from '../product-parameter.service';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';
  includeDetail: boolean = true;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  parentListFilter: string;
  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }

  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  constructor(private productService: ProductService, private productParameterService: ProductParameterService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        // $$: Initialize the filter in the child component according to the value stored in the property bag service
        this.filterComponent.listFilter = this.productParameterService.filterBy;
      },
      (error: any) => this.errorMessage = error as any
    );
  }

  ngAfterViewInit(): void {
    // $$: Access properties/functions of child component by directly getting them via @ViewChild(Type)
    this.parentListFilter = this.filterComponent.listFilter;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onValueChange(value: string): void {
    // $$: store the new value into the property bag service
    this.productParameterService.filterBy = this.filterComponent.listFilter;
    this.performFilter(value);
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
