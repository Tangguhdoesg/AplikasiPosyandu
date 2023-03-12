import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToddlerComponent } from './toddler.component';

describe('ToddlerComponent', () => {
  let component: ToddlerComponent;
  let fixture: ComponentFixture<ToddlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToddlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToddlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
