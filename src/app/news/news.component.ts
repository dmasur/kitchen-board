import { Component, OnInit } from '@angular/core';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { Http, Response, HTTP_BINDINGS, Headers } from '@angular/http';
import {DateFormatPipe} from 'angular2-moment';

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
  styleUrls: ['news.component.css'],
  inputs:['onlineStatus'],
  pipes: [DateFormatPipe]
})
export class NewsComponent implements OnInit {
  newsItems: Array<News>;
  onlineStatus: string;
  lastUpdate:Date;

  constructor(private cookieService: CookieService, private http: Http) {}

  ngOnInit() {
    this.newsItems = [];
    this.loadNews()
  }

  loadNews(){
    if(this.onlineStatus == "online"){
      this.refreshNews();
      setInterval(this.refreshNews, 10 * 60)
    }else {
      this.newsItems = JSON.parse(this.cookieService.get('news.items'));
      this.lastUpdate = JSON.parse(this.cookieService.get('news.savedAt'));
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
    this.lastUpdate = new Date();
    this.cookieService.put('news.savedAt', JSON.stringify(this.lastUpdate));
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
