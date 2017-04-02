import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class CorsService {
  constructor(private http: Http) {
  }

  getResponse(url: string, callback: any): void {
      this.getResponseWithCorsAnywhere(url, callback);
  }

  getResponseWithCorsAnywhere(url: string, callback: any) {
    const headers = new Headers();
    headers.append('X-Requested-With', 'FooBar');
    const observer = this.http.get('https://cors-anywhere.herokuapp.com/' + url, {
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
