/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';

describe('Component: Calendar', () => {
  // it('should create an instance', () => {
  //   let component = new CalendarComponent();
  //   expect(component).toBeTruthy();
  // });
  it('test getDayCountOfMonth', () => {
    let component = new CalendarComponent();
    expect(component.getDayCountOfMonth(new Date(2016, 6, 10))).toBe(30);
    expect(component.getDayCountOfMonth(new Date(2016, 7, 10))).toBe(31);
    expect(component.getDayCountOfMonth(new Date(2016, 1, 10))).toBe(31);
    expect(component.getDayCountOfMonth(new Date(2016, 5, 10))).toBe(31);
  })
  it('test getFirstDayNumber', () => {
    let component = new CalendarComponent();
    expect(component.getFirstDayNumber(new Date(2016, 0, 1))).toBe(4);
    expect(component.getFirstDayNumber(new Date(2016, 1, 1))).toBe(0);
    expect(component.getFirstDayNumber(new Date(2016, 2, 1))).toBe(1);
    expect(component.getFirstDayNumber(new Date(2016, 3, 1))).toBe(4);
  })
});
