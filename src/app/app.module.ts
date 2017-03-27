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
import { AuthenticationService } from './services';

const myCookieOptions = new MyCookieOptions('/');
const settings = new CookieService(myCookieOptions).getObject('settings') as Settings || new Settings();

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
    { provide: Settings, useValue: settings },
    { provide: CookieOptions, useValue: myCookieOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
