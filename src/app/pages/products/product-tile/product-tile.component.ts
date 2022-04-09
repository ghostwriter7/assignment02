import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../core/interfaces';
import { IconsService } from '../../../core/services/IconsService';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  @Input() product!: IProduct;
  @Output() onSelect = new EventEmitter<void>();

  constructor(public iconsService: IconsService) { }

  ngOnInit(): void {
    window.addEventListener('keydown', () => {});
  }

}
