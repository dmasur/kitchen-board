import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';

declare var $:any;

class Quote {
  constructor(public text:string, public author:string) {}
}

@Component({
  moduleId: module.id,
  selector: 'app-quote',
  templateUrl: 'quote.component.html',
  styleUrls: ['quote.component.css'],
  inputs: ['onlineStatus'],
  pipes: [DateFormatPipe]
})

export class QuoteComponent implements OnInit {
  onlineStatus:string;
  quote:Quote;
  lastUpdate:Date;

  constructor(private cookieService:CookieService, private http:Http) {}

  ngOnInit() {
    this.loadQuote()
  }

  loadQuote(){
    if(this.onlineStatus == "online"){
      this.refreshQuote();
      setInterval(() => this.refreshQuote(), 10 * 60 * 1000)
    }else {
      this.quote = JSON.parse(this.cookieService.get('quote.quote'));
      this.lastUpdate = JSON.parse(this.cookieService.get('quote.savedAt'));
    }
  }

  parse(data) {
    var el = $($.parseXML(data.text()));
    this.quote = new Quote(
      el.find("item description").text(),
      el.find("author").text()
    );
    this.lastUpdate = new Date();
    this.cookieService.put('quote.savedAt', JSON.stringify(this.lastUpdate));
    this.cookieService.put('quote.quote', JSON.stringify(this.quote))
  }

  refreshQuote(){
    let observer = this.http.get('https://crossorigin.me/http://spruchsammlung.com/content/rssquotes');
    observer.subscribe(
      data => this.parse(data),
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );
  }

}
