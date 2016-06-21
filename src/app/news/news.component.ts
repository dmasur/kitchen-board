import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http, Response, HTTP_BINDINGS, Headers } from '@angular/http';
class News {
  title: string;
  url: string;
  image: string;
  summary: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit {
  newsItems: Array<News>

  constructor(private cookieService: CookieService, private http: Http) {}

  ngOnInit() {
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

  refreshNews(){
    //this.http.get('http://newsfeed.zeit.de/index').subscribe(data => {
    //  debugger
    //});
  }
}
