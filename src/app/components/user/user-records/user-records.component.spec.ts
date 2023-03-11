import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecordsComponent } from './user-records.component';

describe('UserRecordsComponent', () => {
  let component: UserRecordsComponent;
  let fixture: ComponentFixture<UserRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
