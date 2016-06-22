import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {CookieService} from 'angular2-cookie/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import * as moment from 'moment';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Settings } from './shared/settings';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [Settings, Http, HTTP_PROVIDERS, AuthenticationService, CookieService]
})

export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService){
    moment.locale('de');
  }

  ngOnInit(){
  }
}
