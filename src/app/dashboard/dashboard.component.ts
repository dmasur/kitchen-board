import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { GoogleCalendarComponent } from '../google-calendar/google-calendar.component';
import { WeatherComponent } from '../weather/weather.component';
import { NewsComponent } from '../news/news.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ClockComponent } from '../clock/clock.component';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [GoogleCalendarComponent, WeatherComponent, NewsComponent, ScheduleComponent, ClockComponent]
})
export class DashboardComponent implements OnInit {
  private onlineStatus: string = "offline";

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    if(!this.authenticationService.isAuthenticated){
      this.authenticationService.login();
    }
  }

}