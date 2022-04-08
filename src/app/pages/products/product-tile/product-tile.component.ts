import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../core/interfaces';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  @Input() product!: IProduct;
  @Output() onSelect = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }

}
