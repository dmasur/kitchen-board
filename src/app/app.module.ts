import { BrowserModule } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';
import { Settings } from './shared/settings';
import { MyCookieOptions } from './cookie-options/my-cookie-options';
import { NewsComponent, ScheduleComponent, CameraComponent, WeatherComponent, QuoteComponent } from './components.index';
import { ClockComponent, HumidorComponent, CalendarComponent, NextEventsComponent, SettingsComponent } from './components.index';
import { DashboardComponent } from './components.index';
import { AuthenticationService } from './services';

// must be exported function to use...
export function settingsFactory() {
  return new CookieService(new MyCookieOptions('/')).getObject('settings') as Settings || new Settings();
}

export function cookieOptionsFactory() {
  return new MyCookieOptions('/');
}

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, SettingsComponent, HumidorComponent,
    NextEventsComponent, WeatherComponent, NewsComponent, ScheduleComponent,
    ClockComponent, QuoteComponent, CalendarComponent, CameraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MomentModule
  ],
  providers: [
    Location,
    { provide: Settings, useFactory: settingsFactory },
    { provide: CookieOptions, useFactory: cookieOptionsFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
