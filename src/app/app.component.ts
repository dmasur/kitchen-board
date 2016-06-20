import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AppointmentsService } from './appointments.service';
import IEvent = gapi.client.calendar.IEvent;

class Day{
  events: Array<IEvent> = [];
  date: Date;
}
class Event{
  orgEvent: IEvent;
  date: Date;
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [AuthenticationService, AppointmentsService]
})
export class AppComponent {
  title = 'app works!';
  authenticationService: AuthenticationService;
  appointmentsService: AppointmentsService;
  appointments: Array<string>;
  daysWithEvents: Array<Day>;
  groupedEvents: any;

  constructor(authenticationService: AuthenticationService, appointmentsService: AppointmentsService){
    this.authenticationService = authenticationService;
    this.appointmentsService = appointmentsService;
  }
  sortEvents(event1, event2){
    var date1 = event1.start.dateTime !== null ? event1.start.dateTime : event1.start.date;
    var date2 = event2.start.dateTime !== null ? event2.start.dateTime : event2.start.date;
    return Date.parse(date1) - (Date.parse(date2));
  }
  refreshAppointments() {
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
          events.push({date: Date.parse(date), orgEvent: eventList[i]});
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
      debugger;
      console.log("asd")
    });
  }
}
