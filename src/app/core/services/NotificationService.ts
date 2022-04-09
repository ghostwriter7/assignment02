import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INotification } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new Subject<INotification>()

  public onError(message: string) {
    this.notifications$.next({ message, type: 'error' });
  }

  public onSuccess(message: string) {
    this.notifications$.next({ message, type: 'success' });
  }

  public getNotifications(): Observable<INotification> {
    return this.notifications$.asObservable();
  }
}
