import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatDetailedComponent } from './seat-detailed.component';

describe('SeatDetailedComponent', () => {
  let component: SeatDetailedComponent;
  let fixture: ComponentFixture<SeatDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
