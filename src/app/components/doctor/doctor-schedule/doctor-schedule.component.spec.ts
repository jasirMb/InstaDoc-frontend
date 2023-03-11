import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleComponent } from './doctor-schedule.component';

describe('DoctorScheduleComponent', () => {
  let component: DoctorScheduleComponent;
  let fixture: ComponentFixture<DoctorScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
