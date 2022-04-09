import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductTileComponent,
    AddEditProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class ProductsModule { }
