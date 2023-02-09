import { TestBed } from '@angular/core/testing';

import { doctorService } from './doctor.service';

describe('DoctorService', () => {
  let service: doctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(doctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
