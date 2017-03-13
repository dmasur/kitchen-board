import { Injectable } from '@angular/core';

@Injectable()
export class WaitService {
    static waitForIt(objectToObserve, propertyToObserve) {
        return new Promise(function (resolve, reject) {
            const checkIt = function (objectToObserve, propertyToObserve) {
                if (typeof objectToObserve[propertyToObserve] == 'undefined') {
                    console.log('Waiting 0.5 Second for property ' + propertyToObserve + ' on ' + objectToObserve);
                    setTimeout(checkIt, 500, objectToObserve, propertyToObserve)
                } else {
                    resolve(objectToObserve[propertyToObserve]);
                }
            };
            checkIt(objectToObserve, propertyToObserve);
        });
    }

    static waitForTrue(objectToObserve, propertyToObserve) {
        return new Promise(function (resolve, reject) {
            const checkIt = function (objectToObserve, propertyToObserve) {
                if (objectToObserve[propertyToObserve] === false) {
                    console.log('Waiting 0.5 Second for property ' + propertyToObserve + ' on ' + objectToObserve);
                    setTimeout(checkIt, 500, objectToObserve, propertyToObserve);
                } else {
                    console.log('Found property ' + propertyToObserve + ' in state ' + objectToObserve[propertyToObserve]);
                    resolve(objectToObserve[propertyToObserve])
                }
            };
            checkIt(objectToObserve, propertyToObserve);
        });
    }
}
