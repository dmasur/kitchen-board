import { Component, OnInit } from '@angular/core';
import { BaseSettings } from 'app/shared/baseSettings';
import { CookieService } from 'angular2-cookie/core';
import { Settings } from './../../shared/settings';

@Component({
  selector: 'app-todoist-settings',
  templateUrl: './todoist-settings.component.html',
  styleUrls: ['./todoist-settings.component.css']
})
export class TodoistSettingsComponent extends BaseSettings implements OnInit {

  constructor(cookieService: CookieService, settings: Settings) {
    super(cookieService, settings);
  }

  ngOnInit() {
  }

}
