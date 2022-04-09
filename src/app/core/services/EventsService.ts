import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private isLoading$ = new Subject<boolean>();

  public getLoadingState(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public startLoading(): void {
    this.isLoading$.next(true);
  }

  public stopLoading(): void {
    this.isLoading$.next(false);
  }
}
