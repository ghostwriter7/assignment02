import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { database } from '../../../../core/libs/Firebase';
import { ref, get, child, push, update, remove } from 'firebase/database';
import { EventsService } from '../../../../core/services';
import { NotificationService } from '../../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products: IProduct[] = [];
  private _products$ = new ReplaySubject<IProduct[]>(1);
  private _selectedProduct?: IProduct;
  private _selectedProduct$ = new Subject<IProduct | undefined>();

  constructor(private _eventsService: EventsService,
              private _notificationService: NotificationService) {}

  public fetchProducts() {
    this._eventsService.startLoading();

    const dbRef = ref(database);
    get(child(dbRef, 'products/'))
      .then(snapshot => {
      this._products = snapshot.exists() ? snapshot.val() : [];

      if (!Array.isArray(this._products)) {
        this._products = Object.entries<IProduct>(this._products).flatMap(([key, product]) => ({ ...product, id: key}))
      }

      this._products$.next(this._products);
      const message = this._products.length ? 'Products fetched successfully!' : 'There are no products in the database!';
      this.handleSuccess(message);
    })
      .catch(this.handleError.bind(this, 'An error occurred while fetching products!'))
      .finally(this._eventsService.stopLoading.bind(this._eventsService));
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
    update(ref(database), { ['/products/' + newKey]: product})
      .then(this.handleSuccess.bind(this, 'New product added successfully!'))
      .catch(this.handleError.bind(this, 'An error occurred while saving new product!'))
      .finally(this._eventsService.stopLoading.bind(this._eventsService));
  }

  public updateProduct(product: IProduct): void {
    const idx = this.getIndex(product);
    this._products[idx] = { ...product };
    this._products$.next(this._products);
    this._selectedProduct = undefined;
    this._selectedProduct$.next(this._selectedProduct);

    this._eventsService.startLoading();
    update(ref(database), { ['/products/' + product.id]: product})
      .then(this.handleSuccess.bind(this, 'Product updated successfully!'))
      .catch(this.handleError.bind(this, 'An error occurred while updating your product!'))
      .finally(this._eventsService.stopLoading.bind(this._eventsService));
  }

  public deleteProduct(product: IProduct): void {
    const idx = this.getIndex(product);
    this._products.splice(idx, 1);
    this._products$.next(this._products);

    if (this._selectedProduct === product) {
      this._selectedProduct = undefined;
      this._selectedProduct$.next(this._selectedProduct);
    }

    this._eventsService.startLoading();
    remove(ref(database, `products/${product.id}`))
      .then(this.handleSuccess.bind(this, 'Product deleted successfully!'))
      .catch(this.handleError.bind(this, 'An error occurred while deleting your product'))
      .finally(this._eventsService.stopLoading.bind(this._eventsService));
  }

  private getIndex(product: IProduct): number {
    return this._products.findIndex(x => x.id === product.id);
  }

  private handleSuccess(message: string): void {
    this._notificationService.onSuccess(message);
  }

  private handleError(message: string): void {
    this._notificationService.onError(message);
  }
}
