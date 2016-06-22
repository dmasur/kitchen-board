/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';

describe('Component: Schedule', () => {
  it('should create an instance', () => {
    let component = new ScheduleComponent();
    expect(component).toBeTruthy();
  });

  // it('should display today before 12 o\'clock', () => {
  //   let component = new ScheduleComponent();
  //   var date = new Date(2000,1,1,8);
  //   var displayedDate = component.getDisplayedDate(date);
  //   expect(displayedDate).toBe(date);
  //   expect(component).toBeTruthy();
  // });
});
