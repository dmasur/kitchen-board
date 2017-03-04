import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { NextEventsComponent } from './next-events/index';
import { WeatherComponent } from './weather';
import { NewsComponent } from './news';
import { ScheduleComponent } from './schedule';
import { QuoteComponent } from './quote';
import { ClockComponent } from './clock';
import { HumidorComponent } from './humidor';
import { CalendarComponent } from './calendar';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { Settings } from './shared/settings';
import { MyCookieOptions } from './cookie-options/my-cookie-options';
import { MomentModule } from 'angular2-moment';
import { MaterialModule } from '@angular/material'

export function settingsFactory() {
  return new CookieService(new CookieOptions({})).getObject('settings') || new Settings();
};

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, SettingsComponent, HumidorComponent,
    NextEventsComponent, WeatherComponent, NewsComponent, ScheduleComponent,
    ClockComponent, QuoteComponent, CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MomentModule,
    MaterialModule.forRoot()
  ],
  providers: [
    { provide: Settings, useFactory: settingsFactory },
    { provide: CookieOptions, useClass: MyCookieOptions }],
  bootstrap: [AppComponent]
})
export class AppModule { }
