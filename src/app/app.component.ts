import { TodoistComponent } from './todoist/todoist.component';
import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService, NextEventsService, CalendarService, AppointmentsService, CorsService } from './services/index';
import * as moment from 'moment';
import { CookieService } from 'angular2-cookie/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService, CookieService, NextEventsService, CalendarService, AppointmentsService, CorsService, TodoistComponent]
})
export class AppComponent implements OnInit  {
  @Input() public onlineStatus: string;
  constructor(public authenticationService: AuthenticationService) {
    moment.locale('de');
  }

  setOnlineStatus(): void {
    this.onlineStatus = window.navigator.onLine ? 'online' : 'offline';
  }

  ngOnInit() {
    this.setOnlineStatus();
  }
}
