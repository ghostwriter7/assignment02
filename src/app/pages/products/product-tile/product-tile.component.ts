import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../core/interfaces';
import { IconsService } from '../../../core/services/IconsService';
import { ProductsService } from '../core/services/ProductsService';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  @Input() product!: IProduct;
  @Output() onSelect = new EventEmitter<void>();
  public isActive$!: Observable<boolean>;

  constructor(public iconsService: IconsService,
              private _productsService: ProductsService) { }

  ngOnInit(): void {
    this.isActive$ = this._productsService.getSelectedProduct()
      .pipe(map(x => x === this.product));
  }

  public onDelete(): void {
    this._productsService.deleteProduct(this.product);
  }

}
