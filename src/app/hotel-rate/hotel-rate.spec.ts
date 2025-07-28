import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRate } from './hotel-rate';

describe('HotelRate', () => {
  let component: HotelRate;
  let fixture: ComponentFixture<HotelRate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelRate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelRate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
