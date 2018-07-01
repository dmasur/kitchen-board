import { TodoistService } from './services/todolistService';
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
import { NewsFormModalComponent } from './components.index';
import { DashboardComponent } from './components.index';
import { AuthenticationService } from './services';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoistComponent } from './todoist/todoist.component';
import { TodoistSettingsComponent } from './Todoist/todoist-settings/todoist-settings.component';

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
  { path: 'settings', component: SettingsComponent },
  { path: 'todoist/todoistSettings', component: TodoistSettingsComponent }
];
const serverLogUrl = 'https://kitchenboardlogging.azurewebsites.net/api/HttpTriggerCSharp1';

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, SettingsComponent, HumidorComponent,
    NextEventsComponent, WeatherComponent, NewsComponent, ScheduleComponent,
    TodoistComponent, ClockComponent, QuoteComponent, CalendarComponent, CameraComponent, NewsFormModalComponent, TodoistComponent,
    TodoistSettingsComponent
  ],
  entryComponents: [
    NewsFormModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    MomentModule,
    LoggerModule.forRoot({serverLoggingUrl: serverLogUrl, level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.DEBUG})
  ],
  providers: [
    Location, NewsFormModalComponent, NgbActiveModal, TodoistService,
    { provide: Settings, useFactory: settingsFactory },
    { provide: CookieOptions, useFactory: cookieOptionsFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
