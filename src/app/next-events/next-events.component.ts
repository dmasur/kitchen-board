import { Component, Input } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AppointmentsService, NextEventsService } from '../services/index';
import { Observable } from 'rxjs/Rx';
import { Settings } from '../shared/settings';
import { BasePanel } from '../shared/basePanel';
import { Day } from './shared/day';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-next-events',
  templateUrl: 'next-events.component.html',
  styleUrls: ['next-events.component.css'],
  providers: [NGXLogger]
})
export class NextEventsComponent extends BasePanel {
  daysWithEvents: Array<Day>;
  @Input() onlineStatus: string;

  constructor(
    private appointmentsService: AppointmentsService,
    protected cookieService: CookieService,
    private settings: Settings,
    private nextEventsService: NextEventsService,
    private logger: NGXLogger) {
    super('nextEvents', 10 * 60, cookieService);
  }

  enableConditions(): {} {
    return {
      googleApiKey: this.settings.googleApiKey != null,
      googleClientId: this.settings.googleClientId != null,
      onlineStatus: this.onlineStatus === 'online',
      gapi: typeof (gapi) !== 'undefined'
    };
  }

  filterOldEvents(daysWithEvents: Array<Day>): Array<Day> {
    if(daysWithEvents === undefined) {
      return new Array<Day>();
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    daysWithEvents.filter((day) => day.date >= today);
    return daysWithEvents;
  }

  loadSavedData(): void {
    this.logger.info('loadSaveData from next Event', new Date());
    this.daysWithEvents = this.filterOldEvents(super.loadSavedData() as Array<Day>);
  }

  rowClass(day: Day): string {
    if (day === undefined) {
      return '';
    }
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const dateString = NextEventsService.dateToString(new Date(day.date.toString()));
    if (dateString === NextEventsService.dateToString(today)) {
      return 'success';
    } else if (dateString === NextEventsService.dateToString(tomorrow)) {
      return 'info';
    } else {
      return '';
    }
  }

  refreshData(): void {
    console.log('refreshData from next Event', new Date())
    this.nextEventsService.getDaysWithEvents(4, (daysWithEvents) => {
      console.log('refreshData from next Event success', new Date());
      daysWithEvents = this.filterOldEvents(daysWithEvents);
      this.saveData(daysWithEvents);
      this.daysWithEvents = daysWithEvents;
    });
  }
}
