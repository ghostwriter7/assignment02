import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../core/services/ProductsService';
import { map, Observable } from 'rxjs';
import { IProduct } from '../core/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  public form!: FormGroup;
  public products$!: Observable<IProduct[]>;

  constructor(private _fb: FormBuilder,
              private _productsService: ProductsService) { }

  ngOnInit(): void {
    this.products$ = this._productsService.getProducts();

    this.form = this._fb.group({
      products: this._fb.control('')
    });

    this.form.valueChanges.pipe(map(x => x.products)).subscribe((product) => {
      this._productsService.selectProduct(product);
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._productsService.fetchProducts();
    }, 0);
  }

}
