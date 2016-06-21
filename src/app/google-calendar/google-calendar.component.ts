import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { AppointmentsService } from '../appointments.service';
import IEvent = gapi.client.calendar.IEvent;

class Day{
  events: Array<IEvent> = [];
  date: Date;
}
class Event{
  summary: string;
  date: Date;
}

@Component({
  moduleId: module.id,
  selector: 'app-google-calendar',
  templateUrl: 'google-calendar.component.html',
  styleUrls: ['google-calendar.component.css'],
  providers: [AppointmentsService]
})
export class GoogleCalendarComponent implements OnInit {
  daysWithEvents: Array<Day>;

  constructor(private appointmentsService: AppointmentsService, private cookieService: CookieService) {  }

  ngOnInit() { this.loadEvents() }

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
          var date = eventList[i].start.dateTime !== undefined ? eventList[i].start.dateTime : eventList[i].start.date;
          events.push({date: Date.parse(date), summary: eventList[i].summary});
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
      this.cookieService.put('calendar.savedAt', JSON.stringify(Date.now()));
      this.cookieService.put('calendar.daysWithEvents', JSON.stringify(this.daysWithEvents));
    });
  }

  loadEvents() {
    var lastSave = this.cookieService.getObject('calendar.savedAt');
    if(true || lastSave < Date.now() + 10 * 60000) { // 10 Minuten
      this.daysWithEvents = JSON.parse(this.cookieService.get('calendar.daysWithEvents'));
    } else {
      this.refreshEvents()
    }

  }
}
