import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable()
export class ProductService {
  private productsUrl = 'api/products';
  private products: IProduct[];

  static initializeProduct(): IProduct {
    // Return an initialized object
    return {
      id: 0,
      productName: '',
      productCode: '',
      category: '',
      tags: [],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: ''
    };
  }

  static handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${ err.error.message }`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${ err.status }, body was: ${ err.error }`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    if (this.products) {
      return of(this.products);
    }
    return this.http.get<IProduct[]>(this.productsUrl)
      .pipe(
        tap(data => console.log('All products retrieved:', JSON.stringify(data))),
        tap(data => this.products = data),
        catchError(ProductService.handleError)
      );
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(ProductService.initializeProduct());
    }
    if (this.products) {
      const productFound = this.products.find(product => product.id === id);
      if (productFound) {
        return of(productFound);
      }
    }
    const url = `${ this.productsUrl }/${ id }`;
    return this.http.get<IProduct>(url)
      .pipe(
        tap(data => console.log('Single product retrieved: ' + JSON.stringify(data))),
        catchError(ProductService.handleError)
      );
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (product.id === 0) {
      return this.createProduct(product, headers);
    }
    return this.updateProduct(product, headers);
  }

  deleteProduct(id: number): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${ this.productsUrl }/${ id }`;
    return this.http.delete<IProduct>(url, { headers })
      .pipe(
        tap(() => console.log('deleteProduct: ' + id)),
        tap((data: IProduct) => {
            const index = this.products.indexOf(data);
            this.products.splice(index, 1);
          }
        ),
        catchError(ProductService.handleError)
      );
  }

  private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
    product.id = null; // needed by In memory API to correctly assign a new ID
    return this.http.post<IProduct>(this.productsUrl, product, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        tap(data => this.products.push(data)),
        catchError(ProductService.handleError)
      );
  }

  private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
    const url = `${ this.productsUrl }/${ product.id }`;
    return this.http.put<IProduct>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        catchError(ProductService.handleError)
      );
  }

}
