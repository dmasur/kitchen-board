/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { GoogleCalendarComponent } from './google-calendar.component';

describe('Component: GoogleCalendar', () => {
  it('should create an instance', () => {
    let component = new GoogleCalendarComponent();
    expect(component).toBeTruthy();
  });
});
