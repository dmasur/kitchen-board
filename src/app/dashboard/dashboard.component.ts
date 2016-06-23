import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import { GoogleCalendarComponent } from '../google-calendar/google-calendar.component';
import { WeatherComponent } from '../weather/weather.component';
import { NewsComponent } from '../news/news.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ClockComponent } from '../clock/clock.component';
import { Settings } from '../shared/settings';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [GoogleCalendarComponent, WeatherComponent, NewsComponent, ScheduleComponent, ClockComponent]
})
export class DashboardComponent implements OnInit {
  private onlineStatus: string;
  private enabled:boolean;

  constructor(private authenticationService: AuthenticationService, private settings: Settings) {
    this.enabled = settings.googleApiKey !== undefined && settings.googleClientId !== undefined;
  }

  ngOnInit() {
    if(window.navigator.onLine){
      this.onlineStatus = "online"
    }else{
      this.onlineStatus = "offline"
    }
    if(this.enabled && !this.authenticationService.isAuthenticated){
      this.authenticationService.login();
    }
  }
}
