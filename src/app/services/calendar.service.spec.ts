/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CalendarService } from './calendar.service';

describe('Calendar Service', () => {
  it('test getDayCountOfMonth', () => {
    expect(CalendarService.getDayCountOfMonth(new Date(2016, 6, 10))).toBe(30);
    expect(CalendarService.getDayCountOfMonth(new Date(2016, 7, 10))).toBe(31);
    expect(CalendarService.getDayCountOfMonth(new Date(2016, 1, 10))).toBe(31);
    expect(CalendarService.getDayCountOfMonth(new Date(2016, 5, 10))).toBe(31);
  })
  it('test getFirstDayNumber', () => {
    expect(CalendarService.getFirstDayNumber(new Date(2016, 0, 1))).toBe(4);
    expect(CalendarService.getFirstDayNumber(new Date(2016, 1, 1))).toBe(0);
    expect(CalendarService.getFirstDayNumber(new Date(2016, 2, 1))).toBe(1);
    expect(CalendarService.getFirstDayNumber(new Date(2016, 3, 1))).toBe(4);
  })
});
