import { Component, OnInit } from '@angular/core';
import { EventsService } from './core/services';
import { Observable } from 'rxjs';
import { INotification } from './core/interfaces';
import { NotificationService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading$!: Observable<boolean>;
  public notification$!: Observable<INotification>;

  constructor(private _eventsService: EventsService,
              private _notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loading$ = this._eventsService.getLoadingState();
    this.notification$ = this._notificationService.getNotifications();
  }
}
