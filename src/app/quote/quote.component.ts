import { Component, Input } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';

declare var $: any;

class Quote {
  constructor(public text: string, public author: string) { }
}

@Component({
  selector: 'app-quote',
  templateUrl: 'quote.component.html',
  styleUrls: ['quote.component.css']
})

export class QuoteComponent extends BasePanel {
  public quote: Quote = new Quote('', '');
  @Input() private onlineStatus: string;

  constructor(protected cookieService: CookieService, private http: Http) {
    super('quote', 60 * 60, cookieService); // every Hour
  }

  parse(data) {
    const el = $($.parseXML(data.text()));
    this.quote = new Quote(
      el.find('item description').text(),
      el.find('author').text()
    );
    this.saveData(this.quote);
  }

  refreshData() {
    const observer = this.http.get('https://crossorigin.me/http://spruchsammlung.com/content/rssquotes');
    observer.subscribe(
      data => this.parse(data),
      error => console.error('Error: ' + error),
      () => console.log('Received Quote!')
    );
  }

  loadSavedData() {
    this.quote = super.loadSavedData() as Quote;
  }

  enableConditions(): {} {
    return {
      onlineStatus: this.onlineStatus === 'online'
    };
  }
}
