import { Component, OnInit } from '@angular/core';
import { IProduct } from '../core/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: IProduct[] = [
    { name: 'Product One', description: 'One is the best!' },
    { name: 'Product Two', description: 'Two is the best!' },
    { name: 'Product Three', description: 'Three is the best!' },
    { name: 'Product Four', description: 'Four is the best!' }
  ];
  public form!: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      products: this._fb.control(this.products[0])
    });
  }

}
