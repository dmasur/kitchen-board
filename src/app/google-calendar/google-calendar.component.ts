import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { AppointmentsService } from '../appointments.service';
import {TimeAgoPipe, DateFormatPipe} from 'angular2-moment';
import IEvent = gapi.client.calendar.IEvent;
import {Observable} from 'rxjs/Rx';

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
  daysWithEvents: Array<Day>;
  private onlineStatus:string;
  lastUpdate:Date;

  constructor(private appointmentsService: AppointmentsService, private cookieService: CookieService) {
  }

  ngOnInit() {
    if(this.onlineStatus == "online"){
      setInterval(() => this.refreshEvents(), 10 * 60 * 1000)
    }else {
      this.daysWithEvents = JSON.parse(this.cookieService.get('calendar.daysWithEvents'));
      this.lastUpdate = JSON.parse(this.cookieService.get('calendar.savedAt'));
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
          var event = new Event(new Date(date), eventList[i].summary, hasTime, eventList[i].creator.displayName)
          events.push(event);
        }
      };
      for(var i=0;i<events.length; i++){
        var day : Day = this.daysWithEvents.find(day => (day.date == events[i].date));
        if(day == null){
          day = new Day();
          day.date = events[i].date;
          day.events = [];
          day.events.push(events[i]);
          if(day.date.toString() != "NaN"){
            this.daysWithEvents.push(day);
          }
        }else{
          day.events.push(events[i]);
        }
      }
      this.lastUpdate = new Date();
      this.cookieService.put('calendar.savedAt', JSON.stringify(this.lastUpdate));
      this.cookieService.put('calendar.daysWithEvents', JSON.stringify(this.daysWithEvents));
    });
  }
}
