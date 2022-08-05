import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSeatsComponent } from './user-seats.component';

describe('UserSeatsComponent', () => {
  let component: UserSeatsComponent;
  let fixture: ComponentFixture<UserSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSeatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
