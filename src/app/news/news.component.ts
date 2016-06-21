import { Component, OnInit } from '@angular/core';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { Http, Response, HTTP_BINDINGS, Headers } from '@angular/http';

import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

declare var $:any;

class News {
  title: string;
  url: string;
  image: string;
  summary: string;
  date: Date;
}

@Component({
  moduleId: module.id,
  selector: 'app-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit {
  newsItems: Array<News>;

  constructor(private cookieService: CookieService, private http: Http) {}

  ngOnInit() {
    this.newsItems = [];
    this.loadNews()
  }

  loadNews(){
    var lastSave = this.cookieService.getObject('news.savedAt');
    if(lastSave < Date.now() + 10 * 60000) { // 10 Minuten
      this.newsItems = JSON.parse(this.cookieService.get('news.items'));
    } else {
      this.refreshNews()
    }
  }

  parse(data) {
    var newsItems = [];
    var items = $(data.text()).find("item").slice(0,5);
    for ( var i = 0, l = items.length; i < l; i++ ) {
        var el = $(items[i]);
        var news = new News();
        news.title = el.find("title").text();
        news.summary = el.find("description").text();
        news.date = new Date(el.find("pubDate").text());
        news.image = el.find("enclosure").attr("url");
        newsItems.push(news);
    }
    this.newsItems = newsItems;
    this.cookieService.putObject('news.saveAt', new Date());
    this.cookieService.put('news.items', JSON.stringify(newsItems))
  }


  refreshNews(){
    let observer = this.http.get('https://crossorigin.me/http://www.spiegel.de/schlagzeilen/tops/index.rss');
    observer.subscribe(
      data => this.parse(data),
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );
  }
}
