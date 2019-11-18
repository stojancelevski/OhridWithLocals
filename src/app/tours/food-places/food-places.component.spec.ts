import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPlacesComponent } from './food-places.component';

describe('FoodPlacesComponent', () => {
  let component: FoodPlacesComponent;
  let fixture: ComponentFixture<FoodPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
