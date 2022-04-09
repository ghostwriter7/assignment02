import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  public isNewProduct = true;
  public form!: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: this._fb.control('', [Validators.required]),
      description: this._fb.control('', [Validators.required])
    });
  }

  public onSubmit(): void {
    console.log('submitted');
  }

  public onClear(): void {
    this.form.setValue({
      name: '',
      description: ''
    });
  }

}
