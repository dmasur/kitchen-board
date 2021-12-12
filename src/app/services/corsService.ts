import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class CorsService {
  constructor(private http: Http) {
  }

  getResponse(url: string, callback: any): void {
      this.getResponseWithThingProxy(url, callback);
  }

  getResponseWithThingProxy(url: string, callback: any) {
    const headers = new Headers();
    const observer = this.http.get('https://thingproxy.freeboard.io/fetch/' + url, {
      headers: headers
    });
    observer.subscribe(
      data => callback(data),
      error => () => {
          console.error('thingproxy Proxy Problem: ' + error);
          this.getResponseWithCrossOriginMe(url, callback);
      }
    );
  }

  getResponseWithBridged(url: string, callback: any) {
    const headers = new Headers();
    headers.append('X-Requested-With', 'FooBar');
    const observer = this.http.get('https://cors.bridged.cc/' + url, {
      headers: headers
    });
    observer.subscribe(
      data => callback(data),
      error => () => {
          console.error('CorsAnywhere Proxy Problem: ' + error);
          this.getResponseWithCrossOriginMe(url, callback);
      }
    );
  }

  getResponseWithCrossOriginMe(url: string, callback: any) {
    const observer = this.http.get('https://crossorigin.me/' + url);
    observer.subscribe(
      data => callback(data),
      error => () => {
          console.error('CrossOriginMe Proxy Problem: ' + error);
      }
    );
  }
};
