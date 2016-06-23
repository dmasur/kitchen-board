import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { AppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import {CookieService, CookieOptions} from 'angular2-cookie/core';
import {Settings} from './app/shared/settings';

var cookieService = (new CookieService(new CookieOptions({})));
var settings = cookieService.getObject('settings') || new Settings();

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS, provide(Settings, {useValue: settings})
]);
