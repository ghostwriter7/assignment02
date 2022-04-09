import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services';
import { delay, of, Subscription, switchMap, tap } from 'rxjs';
import { INotification } from '../../core/interfaces';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ transform: 'translateY(-200%)'}),
        animate('300ms', style({ transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)'}),
        animate('300ms', style({ transform: 'translateY(-200%)'}))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  public message?: INotification;
  private _subscription!: Subscription;
  constructor(private _notificationService: NotificationService) { }

  ngOnInit(): void {
   this._subscription = this._notificationService.getNotifications().pipe(
      tap((notification) => this.message = notification),
      switchMap(() => of('hide').pipe(delay(2000), tap(() => this.message = undefined))))
      .subscribe();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
