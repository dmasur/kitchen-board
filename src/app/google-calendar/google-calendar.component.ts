import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { AppointmentsService } from '../services/appointments.service';
import {TimeAgoPipe, DateFormatPipe} from 'angular2-moment';
import {Observable} from 'rxjs/Rx';
import {Settings} from '../shared/settings';
import IEvent = gapi.client.calendar.IEvent;

class Day{
  events: Array<IEvent> = [];
  date: Date;
}
class Event{
  constructor(public date: Date,
              public summary: string,
              public hasTime: boolean,
              public person: string
  ) {}
}

@Component({
  moduleId: module.id,
  selector: 'app-google-calendar',
  pipes: [TimeAgoPipe, DateFormatPipe],
  templateUrl: 'google-calendar.component.html',
  styleUrls: ['google-calendar.component.css'],
  providers: [AppointmentsService],
  inputs: ['onlineStatus']
})
export class GoogleCalendarComponent implements OnInit {
  enabled:boolean;
  daysWithEvents: Array<Day>;
  private onlineStatus:string;
  lastUpdate:Date;

  constructor(private appointmentsService: AppointmentsService, private cookieService: CookieService, private settings: Settings) {
    this.enabled = settings.googleApiKey != null && settings.googleClientId != null;
  }

  ngOnInit() {
    if(this.enabled && this.onlineStatus == "online" && gapi !== undefined){
      this.refreshEvents();
      setInterval(() => this.refreshEvents(), 10 * 60 * 1000)
    }else {
      if(this.cookieService.get('calendar.savedAt') !== undefined){
        this.daysWithEvents = JSON.parse(this.cookieService.get('calendar.daysWithEvents'));
        this.lastUpdate = JSON.parse(this.cookieService.get('calendar.savedAt'));
      }
    }
  }

  dateString(date:Date): string{
    return date.getFullYear().toString() + date.getMonth().toString() + date.getDay().toString();
  }

  rowClass(day:Day):string{
    var today = new Date();
    var tomorrow = new Date(today.getFullYear(), today.getMonth()+1, today.getDay()+1)
    var dateString = this.dateString(new Date(day.date.toString()));
    if(dateString == this.dateString(today)){
      return "success";
    }else if(dateString == this.dateString(tomorrow)){
      return "info";
    }else{
      return "";
    }
  }
  refreshEvents() {
    /*
     * loading the appointments is done asychronously. the service's loadAppointments() method
     * returns a Promise that provides access to the newly loaded set of appointments. Updating
     * the array of appointments triggers angular's one-way-binding between the field and the
     * widget.
     */
    this.appointmentsService.loadAppointments().then(appointments => {
      var events = [];
      this.daysWithEvents = [];
      var eventList = (appointments as Array<IEvent>);
      for(var i=0; i<eventList.length; i++) {
        if(eventList[i].start != undefined){
          var hasTime = eventList[i].start.dateTime !== undefined;
          var date = hasTime ? eventList[i].start.dateTime : eventList[i].start.date;
          var displayName = eventList[i].creator.displayName;
          if(displayName.includes('webcal')){
            displayName = null;
          }
          var event = new Event(new Date(date), eventList[i].summary, hasTime, displayName)
          events.push(event);
        }
      };
      events = events.sort((a,b) => a.date.getTime() - b.date.getTime());
      var days:Array<Day> = [];
      for(var i=0;i<events.length; i++){
        var day : Day = days.find(day => (this.dateString(day.date) == this.dateString(events[i].date)));
        if(day == null){
          day = new Day();
          day.date = events[i].date;
          day.events = [];
          day.events.push(events[i]);
          if(day.date.toString() != "NaN"){
            days.push(day);
          }
        }else{
          day.events.push(events[i]);
        }
      }
      this.daysWithEvents = days.slice(0,4);
      this.lastUpdate = new Date();
      this.cookieService.put('calendar.savedAt', JSON.stringify(this.lastUpdate));
      this.cookieService.put('calendar.daysWithEvents', JSON.stringify(this.daysWithEvents));
    });
  }
}
