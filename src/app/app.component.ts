import { Component, OnInit } from '@angular/core';
import { GoogleCalendarComponent } from './google-calendar/google-calendar.component';
import { WeatherComponent } from './weather/weather.component';
import { NewsComponent } from './news/news.component';
import {AuthenticationService} from './authentication.service'
import {CookieService} from 'angular2-cookie/core';
import { Http, Response, HTTP_BINDINGS } from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [GoogleCalendarComponent, WeatherComponent, NewsComponent],
  providers: [Http, HTTP_BINDINGS, AuthenticationService, CookieService]
})

export class AppComponent {
  constructor(private authenticationService: AuthenticationService){
    //moment.locale('de');
  }
}
