import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/index';
import { Settings } from '../shared/settings';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input() public onlineStatus: string;
  private enabled: boolean;
  public thisMonth: Date;
  public nextMonth: Date;
  public weatherCity: string;
  public weatherLongitude: string;
  public weatherLatitude: string;

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

  silentLoginToGoogle(): void {
    if (this.enabled && !this.authenticationService.isAuthenticated) {
      this.authenticationService.silentLoginToGoogle();
    }
  }

  loginToGoogle(): void {
    if (this.enabled && !this.authenticationService.isAuthenticated) {
      this.authenticationService.login();
    }
  }

  ngOnInit() {
    this.setDates();
    this.setOnlineStatus();
    this.silentLoginToGoogle();
    this.weatherCity = this.settings.weatherCity;
    this.weatherLongitude = this.settings.weatherLongitude;
    this.weatherLatitude = this.settings.weatherLatitude;
  }
}
