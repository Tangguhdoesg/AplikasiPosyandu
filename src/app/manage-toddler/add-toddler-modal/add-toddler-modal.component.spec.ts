import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToddlerModalComponent } from './add-toddler-modal.component';

describe('AddToddlerModalComponent', () => {
  let component: AddToddlerModalComponent;
  let fixture: ComponentFixture<AddToddlerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToddlerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToddlerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
