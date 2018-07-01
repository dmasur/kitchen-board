/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.plus/index.d.ts" />

import { Injectable } from '@angular/core';
import { Settings } from '../shared/settings';
import { WaitService } from 'app/services/waitService';

@Injectable()
export class AuthenticationService {
  static clientId = '1078497277864-qqbub1tptpk82t6n79of58t4san95sng.apps.googleusercontent.com';
  static apiKey = 'AIzaSyDqnBamyp-2_KLiekRLSkq4dtYVOnM0dbA';

  static scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar.readonly'];
  /*
   * global application state, so it's OK to keep it as field value of a singleton. alternative would be a
   * buitl-in global value store.
   */
  public isAuthenticated = false;
  public userName: string;
  public userImageUrl: string;
  private clientId: string;
  private apiKey: string;

  constructor(private settings: Settings) {
    console.log('Init AuthenticationService');
  }
  silentLoginToGoogle(): Promise<void> {
    if (this.isAuthenticated) { return; };
    // check the authentication and present a dialog on failure
    return this.internalAuthenticate(true);
  }
  login(): Promise<void> {
    if (this.isAuthenticated) { return; };
    // check the authentication and present a dialog on failure
    return this.internalAuthenticate(false);
  }

  private internalAuthenticate(immediate: boolean): Promise<void> {
    /* heavily use promises here for 2 reasons:
     *
     * nr1: readability (image callback syntax here :( )
     * nr2: ui synchronisation: due to the GAPI, the result is handled in a callback,
     *		angular does therefor not know of any scope changes. since ther is no scope
     *		as in angular1 one cannot manually trigger the scope digest.
     *		Using Promises solves this problem since the scope digest is triggered on
     *		resove() and reject().
     * The callbacks passed to then() are lambdas to ensure the call applies to the correct
     * scope.
     */
    return WaitService.waitForIt(gapi, 'client').then(() => {
      this.proceedAuthentication(immediate).then(() => this.initializeGooglePlusAPI())
        .then(() => this.initializeGoogleCalendarAPI())
        .then(() => this.loadGooglePlusUserData())
        .catch((error: any) => { console.log('authentication failed: ' + error) });
    });
  }

  private proceedAuthentication(immediate: boolean): Promise<{}> {
    return new Promise<any>((resolve, reject) => {
      console.log('proceed authentication - immediate: ' + immediate);
      gapi.client.setApiKey(AuthenticationService.apiKey);
      const authorisationRequestData = {
        client_id: AuthenticationService.clientId,
        scope: AuthenticationService.scopes,
        immediate: immediate,
        response_type: 'token'
      };
      gapi.auth.authorize(authorisationRequestData,
        (authenticationResult) => {
          this.isAuthenticated = authenticationResult && !authenticationResult.error;
          if (this.isAuthenticated) {
            resolve('authenticated');
          } else {
            reject('not authenticated');
          }
        }
      );
    }).catch((reason: any) => {
      console.log('proceedAuthentication Error: ' + reason);
    });
  }

  private initializeGooglePlusAPI() {
    return new Promise((resolve, reject) => {
      console.log('initialize Google Plus API');
      const loadPromise = gapi.client.load('plus', 'v1');
      if (loadPromise.catch !== undefined) {
        loadPromise.catch((reason: any) => { debugger });
      }
      resolve(loadPromise);
    }).catch((reason: any) => {
      console.log('initializeGooglePlusAPI Error: ' + reason);
    });
  }

  private initializeGoogleCalendarAPI() {
    return new Promise((resolve, reject) => {
      console.log('initialize Google Calendar API');
      resolve(gapi.client.load('calendar', 'v3'));
    }).catch((reason: any) => {
      console.log('initializeGoogleCalendarAPI Error: ' + reason);
    });
  }

  private loadGooglePlusUserData() {
    return new Promise((resolve, reject) => {
      console.log('load Google Plus data');
      const request = gapi.client.plus.people.get({ 'userId': 'me' });
      request.execute((response) => this.setUserData(response.displayName, response.image.url));
      resolve();
    }).catch((reason: any) => {
      console.log('loadGooglePlusUserData Error: ' + reason);
    });
  }

  private setUserData(userName: string, userImageUrl: string) {
    this.userName = userName;
    this.userImageUrl = userImageUrl;
    console.log('user: ' + this.userName + ', image: ' + this.userImageUrl);
  }
}
