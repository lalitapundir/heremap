import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckroadComponent } from './truckroad.component';

describe('TruckroadComponent', () => {
  let component: TruckroadComponent;
  let fixture: ComponentFixture<TruckroadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TruckroadComponent]
    });
    fixture = TestBed.createComponent(TruckroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
