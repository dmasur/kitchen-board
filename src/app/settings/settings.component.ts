import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Settings } from '../shared/settings';
import { ClassDuration } from '../schedule/shared/classDuration';
import { BaseSettings } from 'app/shared/baseSettings';
declare var window: any;

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent extends BaseSettings implements OnInit {
  constructor(cookieService: CookieService, settings: Settings) {
    super(cookieService, settings);
  }

  ngOnInit() {
    this.settings = this.settings || new Settings();
  }
}
