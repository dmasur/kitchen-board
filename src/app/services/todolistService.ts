// import { Http, RequestOptions, Headers } from '@angular/http';
import { Settings } from './../shared/settings';
import { Injectable } from '@angular/core';
import { Todo } from 'app/todoist/todo';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class TodoistService {
  constructor(private settings: Settings, private http: HttpClient) {
  }

  getItems(callback: any): any {
    const postData = {
      token: this.settings.todoistApiKey,
      sync_token: '*',
      resource_types: '["items"]'
    };
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new HttpParams()
      .set(`token`, this.settings.todoistApiKey)
      .set(`sync_token`, '*')
      .set(`resource_types`, '["items"]');
    const observer = this.http.post('https://todoist.com/api/v7/sync', body.toString(), {headers});
    observer.subscribe(data => {
        callback(this.parse(data));
    });
  }

  parse(data): Todo[] {
    const todos = [];
    for (const item of data.items){
        const todo = new Todo();
        todo.title = item.content;
        todos.push(todo);
    }
    return todos;
  }
};
