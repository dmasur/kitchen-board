import { TodoistComponent } from './todoist/todoist.component';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { CookieService } from 'angular2-cookie/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from 'app/services/authenticationService';
import { NextEventsService } from 'app/services/nextEventsService';
import { CalendarService } from 'app/services/calendarService';
import { AppointmentsService } from 'app/services/appointmentsService';
import { CorsService } from 'app/services/corsService';

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
