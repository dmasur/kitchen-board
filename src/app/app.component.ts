import { Component } from '@angular/core';
import { AuthenticationService, NextEventsService, CalendarService, AppointmentsService } from './services/index';
import * as moment from 'moment';
import { CookieService } from 'angular2-cookie/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService, CookieService, NextEventsService, CalendarService, AppointmentsService]
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) {
    moment.locale('de');
  }
}
