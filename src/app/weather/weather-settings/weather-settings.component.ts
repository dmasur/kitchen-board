import { Component, OnInit } from '@angular/core';
import { BaseSettings } from 'app/shared/baseSettings';
import { CookieService } from 'angular2-cookie/core';
import { Settings } from './../../shared/settings';

@Component({
  selector: 'app-weather-settings',
  templateUrl: './weather-settings.component.html',
  styleUrls: ['./weather-settings.component.css']
})
export class WeatherSettingsComponent extends BaseSettings implements OnInit {

  constructor(cookieService: CookieService, settings: Settings) {
    super(cookieService, settings);
  }

  ngOnInit() {
  }

}
