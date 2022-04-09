import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventsService } from './core/services/EventsService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading$!: Observable<boolean>;
  constructor(private _eventsService: EventsService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading$ = this._eventsService.getLoadingState();
    }, 0);
  }
}
