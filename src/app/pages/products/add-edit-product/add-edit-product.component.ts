import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../core/services/ProductsService';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  public isNewProduct = true;
  public form!: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(private _fb: FormBuilder,
              private _productsService: ProductsService) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: this._fb.control('', [Validators.required]),
      description: this._fb.control('', [Validators.required]),
      id: this._fb.control('')
    });

    this._productsService.getSelectedProduct().pipe(takeUntil(this._destroy$))
      .subscribe((product) => {
      this.isNewProduct = false;
      if (product) {
        this.form.setValue({...product});
      } else {
        this.form.setValue({ name: '', description: '', id: ''});
        this.isNewProduct = true;
      }
    });
  }

  public onSubmit(): void {
    const { value } = this.form;
    this.isNewProduct
      ? this._productsService.addNewProduct(value)
      : this._productsService.updateProduct(value);

    this.isNewProduct = true;
    this.onClear();
  }

  public onClear(): void {
    this.form.setValue({
      name: '',
      description: '',
      id: ''
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
