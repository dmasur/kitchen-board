import { Injectable } from '@angular/core';

@Injectable()
export class WaitService {
    static checkIt(objectToObserve, propertyToObserve, resolve) {
        if (typeof objectToObserve[propertyToObserve] === 'undefined') {
            console.log('Waiting 0.5 Second for property ' + propertyToObserve + 'on ' + objectToObserve);
            setTimeout(this.checkIt, 500, objectToObserve, propertyToObserve);
        } else {
            resolve(objectToObserve[propertyToObserve]);
        }
    };
    static waitForIt(objectToObserve, propertyToObserve) {
        return new Promise(function (resolve, reject) {
            WaitService.checkIt(objectToObserve, propertyToObserve, resolve);
        });
    }
}
