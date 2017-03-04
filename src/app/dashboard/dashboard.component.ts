import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/index';

import { Settings } from '../shared/settings';

@Component({
  providers: [AuthenticationService],
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
      typeof (gapi) !== 'undefined';
  }

  setDates(): void {
    const today = new Date();
    this.thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }

  setOnlineStatus(): void {
    this.onlineStatus = window.navigator.onLine ? 'online' : 'offline';
  }

  loginToGoogle(): void {
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
