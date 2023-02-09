import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorManageComponent } from './doctor-manage.component';

describe('DoctorManageComponent', () => {
  let component: DoctorManageComponent;
  let fixture: ComponentFixture<DoctorManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
