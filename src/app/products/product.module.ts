import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductShellDetailComponent } from './product-shell/product-shell-detail/product-shell-detail.component';
import { ProductShellListComponent } from './product-shell/product-shell-list/product-shell-list.component';
import { ProductShellComponent } from './product-shell/product-shell.component';

import { ProductService } from './product.service';
import { ProductEditGuard } from './product-edit/product-edit-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      // { path: '', component: ProductListComponent },
      { path: '', component: ProductShellComponent},
      { path: ':id', component: ProductDetailComponent },
      {
        path: ':id/edit',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductShellComponent,
    ProductShellDetailComponent,
    ProductShellListComponent
  ],
  providers: [
    ProductService,
    ProductEditGuard
  ]
})
export class ProductModule {
}
