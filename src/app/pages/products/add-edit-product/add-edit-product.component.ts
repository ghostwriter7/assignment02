import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../core/services/ProductsService';
import { Subject, takeUntil } from 'rxjs';
import { IconsService } from '../../../core/services';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  @ViewChildren('input') inputs!: QueryList<ElementRef>;
  public isNewProduct = true;
  public form!: FormGroup;
  public get name() { return this.form.get('name')!; }
  public get description() { return this.form.get('description')!; }

  private _destroy$ = new Subject<void>();

  constructor(
    public iconsService: IconsService,
    private _fb: FormBuilder,
    private _productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      name: this._fb.control('', [Validators.required, Validators.maxLength(15)]),
      description: this._fb.control('', [Validators.required, Validators.maxLength(30)]),
      id: this._fb.control('')
    });

    this._productsService.getSelectedProduct().pipe(takeUntil(this._destroy$))
      .subscribe((product) => {
      if (product) {
        this.form.setValue({...product});
        this.isNewProduct = false;
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
    this.form.reset({
      name: '',
      description: '',
      id: ''
    });

    this.inputs.toArray().forEach(x => x.nativeElement.blur());
  }

  public onClear(): void {
    const id = this.form.value['id'] ? this.form.value['id'] : '';
    this.form.reset({ name: '', description: '', id });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
