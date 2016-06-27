import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services';
import { NextEventsComponent } from '../next-events/index';
import { WeatherComponent } from '../weather';
import { NewsComponent } from '../news';
import { ScheduleComponent } from '../schedule';
import { QuoteComponent } from '../quote';
import { ClockComponent } from '../clock';
import { CalendarComponent } from '../calendar';
import { Settings } from '../shared/settings';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [NextEventsComponent, WeatherComponent, NewsComponent, ScheduleComponent, ClockComponent, QuoteComponent, CalendarComponent]
})
export class DashboardComponent implements OnInit {
  private onlineStatus: string;
  private enabled: boolean;
  private thisMonth: Date;
  private nextMonth: Date;

  constructor(private authenticationService: AuthenticationService, private settings: Settings) {
    this.enabled = settings.googleApiKey !== undefined && settings.googleClientId !== undefined;
  }

  ngOnInit() {
    var today = new Date();
    this.thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    if (window.navigator.onLine) {
      this.onlineStatus = "online"
    } else {
      this.onlineStatus = "offline"
    }
    if (this.enabled && !this.authenticationService.isAuthenticated) {
      this.authenticationService.login();
    }
  }
}
