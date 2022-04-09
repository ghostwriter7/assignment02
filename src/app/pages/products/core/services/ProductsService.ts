import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { database } from '../../../../core/libs/Firebase';
import { set, ref, get, child, push, update } from 'firebase/database';
import { EventsService } from '../../../../core/services/EventsService';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products: IProduct[] = [];
  private _products$ = new ReplaySubject<IProduct[]>(1);
  private _selectedProduct?: IProduct;
  private _selectedProduct$ = new Subject<IProduct | undefined>();

  constructor(private _eventsService: EventsService) {}

  public fetchProducts() {
    this._eventsService.startLoading();

    const dbRef = ref(database);
    get(child(dbRef, 'products/')).then(snapshot => {
      debugger
      this._products = snapshot.exists() ? Object.values(snapshot.val()) : [];
      this._products$.next(this._products);
    }).catch(e => {
      //...handle errors
    }).finally(() => {
      this._eventsService.stopLoading();
    });
  }

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

    const newKey = push(child(ref(database), 'products')).key;

    this._eventsService.startLoading();
    update(ref(database), {
      ['/products/' + newKey]: product
    }).finally(() => {
      this._eventsService.stopLoading();
    });
  }

  public updateProduct(product: IProduct): void {
    const idx = this.getIndex(product);
    this._products[idx] = product;
    this._selectedProduct = undefined;
    this._selectedProduct$.next(this._selectedProduct);

    this.saveData();
  }

  public deleteProduct(product: IProduct): void {
    const idx = this.getIndex(product);
    this._products.splice(idx, 1);
    this._products$.next(this._products);

    if (this._selectedProduct === product) {
      this._selectedProduct = undefined;
      this._selectedProduct$.next(this._selectedProduct);
    }

    this.saveData();
  }

  private getIndex(product: IProduct): number {
    return this._products.findIndex(x => x === product);
  }

  private saveData(): void {
    set(ref(database, 'products/'), {
      ...this._products
    }).then(console.log).catch(console.log);
  }
}
