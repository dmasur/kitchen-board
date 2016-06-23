import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import * as moment from 'moment';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [Http, HTTP_PROVIDERS, AuthenticationService, CookieService]
})

export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService){
    moment.locale('de');
  }

  ngOnInit(){
  }
}
