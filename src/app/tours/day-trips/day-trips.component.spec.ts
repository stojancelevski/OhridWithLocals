import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTripsComponent } from './day-trips.component';

describe('DayTripsComponent', () => {
  let component: DayTripsComponent;
  let fixture: ComponentFixture<DayTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
