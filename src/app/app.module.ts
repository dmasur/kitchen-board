import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { Settings } from './shared/settings';
import { MyCookieOptions } from './cookie-options/my-cookie-options';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { WeatherComponent } from './weather';
import { NewsComponent } from './news';
import { ScheduleComponent } from './schedule';
import { CameraComponent } from './camera';
import { QuoteComponent } from './quote';
import { ClockComponent } from './clock';
import { HumidorComponent } from './humidor';
import { CalendarComponent } from './calendar';
import { NextEventsComponent } from './next-events';
import { MomentModule } from 'angular2-moment';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

export function settingsFactory() {
  return new CookieService(new CookieOptions({})).getObject('settings') || new Settings();
};

export function cookieOptionFactory() {
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
    { provide: CookieOptions, useFactory: cookieOptionFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
