import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../core/interfaces';
import { IconsService } from '../../../core/services/IconsService';
import { ProductsService } from '../core/services/ProductsService';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  @Input() product!: IProduct;
  @Input() isActive!: boolean;
  @Output() onSelect = new EventEmitter<void>();

  constructor(public iconsService: IconsService,
              private _productsService: ProductsService) { }

  ngOnInit(): void {
  }

  public onDelete(): void {
    this._productsService.deleteProduct(this.product);
  }

}
