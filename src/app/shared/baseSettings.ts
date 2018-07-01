import { CookieService } from 'angular2-cookie/core';
import { Settings } from 'app/shared';

export class BaseSettings {
    constructor(private cookieService: CookieService, public settings: Settings) {
    }

    onSubmit() {
        this.cookieService.putObject('settings', this.settings);
        window.history.back();
    }
}