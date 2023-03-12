import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckupModalComponent } from './add-checkup-modal.component';

describe('AddCheckupModalComponent', () => {
  let component: AddCheckupModalComponent;
  let fixture: ComponentFixture<AddCheckupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCheckupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCheckupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
