import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AppointmentsService } from './appointments.service';

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
  events: Array<IEvent>;

  constructor(authenticationService: AuthenticationService, appointmentsService: AppointmentsService){
    this.authenticationService = authenticationService;
    this.appointmentsService = appointmentsService;
  }
  refreshAppointments() {
    /*
     * loading the appointments is done asychronously. the service's loadAppointments() method
     * returns a Promise that provides access to the newly loaded set of appointments. Updating
     * the array of appointments triggers angular's one-way-binding between the field and the
     * widget.
     */
    this.appointmentsService.loadAppointments().then((newAppointments) => {
      // clean the array of existing appointments
      //this.appointments.splice(0, this.appointments.length);
      // copy all new items to the array of existing appointments
      //this.appointments.push.apply(this.appointments, newAppointments);
      //console.log('displaying ' + this.appointments.length + ' appointments')
      this.events = (Array<IEvent>) newAppointments;
      //this.appointments = newAppointments;
    });
  }
}
