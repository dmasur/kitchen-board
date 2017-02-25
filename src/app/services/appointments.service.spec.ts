/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AppointmentsService } from './appointments.service';

describe('Appointments Service', () => {
  beforeEachProviders(() => [AppointmentsService]);

  it('should ...',
    inject([AppointmentsService], (service: AppointmentsService) => {
      expect(service).toBeTruthy();
    }));
});
