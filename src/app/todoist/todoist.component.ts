import { TodoistService } from './../services/todolistService';
import { Settings } from './../shared/settings';
import { CorsService } from './../services/corsService';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { BasePanel } from 'app/shared';
import { Todo } from 'app/todoist/todo';
declare var $: any;



@Component({
  selector: 'app-todoist',
  templateUrl: './todoist.component.html',
  styleUrls: ['./todoist.component.css']
})
export class TodoistComponent extends BasePanel {
  todos: Array<Todo> = [];

  @Input() private onlineStatus: string;

  constructor(protected cookieService: CookieService,
    private http: Http,
    private settings: Settings,
    private todoistService: TodoistService) {
      super('todos', 5 * 60, cookieService);
  }

  refreshData() {
    this.todoistService.getItems((data) => {
      this.todos = data;
      this.saveData(data);
    });
  }

  enableConditions(): {} {
    return {
      onlineStatus: this.onlineStatus === 'online',
      todoistApiKey: this.settings.todoistApiKey != null
    };
  }
}
