import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../core/interfaces';
import { IconsService } from '../../../core/services';
import { ProductsService } from '../core/services/ProductsService';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  @Input() product!: IProduct;
  @Output() onSelect = new EventEmitter<void>();
  public isActive$!: Observable<boolean>;
  public showConfirmationPopup = false;

  constructor(public iconsService: IconsService,
              private _productsService: ProductsService) { }

  ngOnInit(): void {
    this.isActive$ = this._productsService.getSelectedProduct()
      .pipe(map(x => x === this.product));
  }

  public onShowConfirmation(): void {
    this.showConfirmationPopup = true;
    setTimeout(() => {
      this.showConfirmationPopup = false;
    }, 3000);
  }

  public onDelete(): void {
    this._productsService.deleteProduct(this.product);
  }
}
