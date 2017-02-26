import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/index';

import { Settings } from '../shared/settings';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private onlineStatus: string;
  private enabled: boolean;
  private thisMonth: Date;
  private nextMonth: Date;

  constructor(private authenticationService: AuthenticationService, private settings: Settings) {
    this.enabled = settings.googleApiKey !== undefined &&
    settings.googleClientId !== undefined &&
    typeof(gapi) !== 'undefined'
  }

  setDates():void{
    var today = new Date();
    this.thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }

  setOnlineStatus():void{
    if (window.navigator.onLine) {
      this.onlineStatus = "online"
    } else {
      this.onlineStatus = "offline"
    }
  }

  loginToGoogle():void{
    if (this.enabled && !this.authenticationService.isAuthenticated) {
      this.authenticationService.login();
    }
  }

  ngOnInit() {
    this.setDates();
    this.setOnlineStatus();
    this.loginToGoogle();
  }
}
