import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcagDatePickerComponent } from './wcag-date-picker.component';

describe('WcagDatePickerComponent', () => {
  let component: WcagDatePickerComponent;
  let fixture: ComponentFixture<WcagDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WcagDatePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WcagDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
