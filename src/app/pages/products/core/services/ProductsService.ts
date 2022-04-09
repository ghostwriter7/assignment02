import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products: IProduct[] = [
    { name: 'Product One', description: 'One is the best!' },
    { name: 'Product Two', description: 'Two is the best!' },
    { name: 'Product Three', description: 'Three is the best!' },
    { name: 'Product Four', description: 'Four is the best!' }
  ];
  private _products$ = new BehaviorSubject<IProduct[]>(this._products)
  private _selectedProduct?: IProduct;
  private _selectedProduct$ = new Subject<IProduct | undefined>();

  public getProducts(): Observable<IProduct[]> {
    return this._products$.asObservable();
  }

  public selectProduct(product: IProduct): void {
    this._selectedProduct = product;
    this._selectedProduct$.next(this._selectedProduct);
  }

  public getSelectedProduct(): Observable<IProduct | undefined> {
    return this._selectedProduct$.asObservable();
  }

  public addNewProduct(product: IProduct): void {
    this._products.push(product);
    this._products$.next(this._products);
  }

  public updateProduct(product: IProduct): void {
    const idx = this.getIndex(product);
    this._products[idx] = product;
    this._selectedProduct = undefined;
    this._selectedProduct$.next(this._selectedProduct);
  }

  public deleteProduct(product: IProduct): void {
    const idx = this.getIndex(product);
    this._products.splice(idx, 1);
    this._products$.next(this._products);

    if (this._selectedProduct === product) {
      this._selectedProduct = undefined;
      this._selectedProduct$.next(this._selectedProduct);
    }
  }

  private getIndex(product: IProduct): number {
    return this._products.findIndex(x => x === product);
  }
}
