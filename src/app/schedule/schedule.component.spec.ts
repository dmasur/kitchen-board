/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  async, inject
} from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';

describe('Component: Schedule', () => {
  it('should create an instance', () => {
    let component = new ScheduleComponent(null, null);
    expect(component).toBeTruthy();
  });

  it('should display today before 12 o\'clock', () => {
    let component = new ScheduleComponent(null, null);
    var date = new Date(2000, 1, 1, 11);
    var displayedDate = component.getDisplayedDate(date);
    expect(displayedDate).toBe(date);
    expect(component).toBeTruthy();
  });

  it('should display today after 12 o\'clock', () => {
    let component = new ScheduleComponent(null, null);
    var date = new Date(2000, 1, 1, 13);
    var displayedDate = component.getDisplayedDate(date);
    expect(displayedDate.getTime()).toBe(new Date(2000, 1, 2, 15).getTime());
    expect(component).toBeTruthy();
  });
});
