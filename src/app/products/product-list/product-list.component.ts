import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';
  listFilter: string;
  showImage: boolean;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  // $$: We use NgModel here because we would like to access the "valueChanges" property on NgModel
  @ViewChild(NgModel) filterElementRef: NgModel;
  // @ViewChild('filterElement') filterElementRef: NgModel;

  // $$: Two ways of retrieving ViewChildren
  // @ViewChildren(NgModel) inputElementRefs: QueryList<ElementRef>;
  @ViewChildren('filterElement, nameElement') inputElementRefs: QueryList<ElementRef>;

  /*
  private _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  // $$: call filter function on value change
  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(this.listFilter);
  }
  */

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.listFilter);
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  // $$: View child is available on ngAfterViewInit
  ngAfterViewInit(): void {
    // this.filterElementRef.nativeElement.focus();
    this.filterElementRef.valueChanges.subscribe((value) => this.onFilterChange(value));

    console.log(this.inputElementRefs);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }

  onFilterChange(filterString: string): void {
    this.listFilter = filterString;
    this.performFilter(this.listFilter);
  }

}
