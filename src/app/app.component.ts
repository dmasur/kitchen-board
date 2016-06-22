import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {CookieService} from 'angular2-cookie/core';
import { Http, HTTP_BINDINGS } from '@angular/http';
import * as moment from 'moment';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [Http, HTTP_BINDINGS, AuthenticationService, CookieService]
})

export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService){
    moment.locale('de');
  }

  ngOnInit(){
  }
}
