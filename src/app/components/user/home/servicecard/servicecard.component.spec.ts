import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecardComponent } from './servicecard.component';

describe('ServicecardComponent', () => {
  let component: ServicecardComponent;
  let fixture: ComponentFixture<ServicecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
