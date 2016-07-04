import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { AppComponent, environment } from './app/';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import {CookieService, CookieOptions, BaseCookieOptions} from 'angular2-cookie/core';
import {Settings} from './app/shared/settings';

var cookieService = (new CookieService(new CookieOptions({})));
var settings = cookieService.getObject('settings') || new Settings();

if (environment.production) {
  enableProdMode();
}

class MyCookieOptions extends BaseCookieOptions {
  expires : string = 'Fri, 31 Dec 9999 23:59:59 GMT';
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS, provide(Settings, {useValue: settings}), provide(CookieOptions, {useClass: MyCookieOptions})
]);
