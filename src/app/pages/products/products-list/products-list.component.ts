import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IProduct } from '../core/interfaces';

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
  ]
})
export class ProductsListComponent implements OnInit, ControlValueAccessor {
  @Input() products!: IProduct[];
  public onChange!: (product: IProduct) => void;
  public onTouched!: () => void;
  public disabled = false;
  public selectedProduct?: IProduct;

  constructor() { }

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

}
