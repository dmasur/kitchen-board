import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NextEventsComponent } from '../next-events/next-events.component';
import { WeatherComponent } from '../weather/weather.component';
import { NewsComponent } from '../news/news.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { QuoteComponent } from '../quote/quote.component';
import { ClockComponent } from '../clock/clock.component';
import { CalendarComponent } from '../calendar/calendar.component';
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
