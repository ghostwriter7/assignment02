import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IProduct } from '../core/interfaces';
import { IconsService } from '../../../core/services/IconsService';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductsListComponent),
      multi: true
    }
  ],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ transform: 'translateY(-200%)'}),
        animate('500ms', style({transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        style({transform: 'translateY(0)'}),
        animate('500ms', style({transform: 'translateY(-200%)'}))
      ])
    ]),
    trigger('skipInitAnim', [
      transition(':enter', [])
    ])
  ]
})
export class ProductsListComponent implements OnInit, ControlValueAccessor {
  @Input() products!: IProduct[];
  public onChange!: (product: IProduct) => void;
  public onTouched!: () => void;
  public disabled = false;
  public selectedProduct?: IProduct;
  public isVisible = true;

  constructor(public iconsService: IconsService) { }

  ngOnInit(): void {
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(obj: any): void {
    if (typeof this.onChange === 'function') {
      this.onChange(this.selectedProduct!);
    }
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public onSelectProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.writeValue(this.selectedProduct);
  }

  public onToggle(): void {
    this.isVisible = !this.isVisible;
  }

}
