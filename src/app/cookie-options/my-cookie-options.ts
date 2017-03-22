import {BaseCookieOptions} from 'angular2-cookie/core';
import {Location} from '@angular/common';

export class MyCookieOptions extends BaseCookieOptions {
    expires = 'Fri, 31 Dec 9999 23:59:59 GMT';

    constructor(path: string) {
        super(path);
    }
};
