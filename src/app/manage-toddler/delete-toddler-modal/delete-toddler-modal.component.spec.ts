import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToddlerModalComponent } from './delete-toddler-modal.component';

describe('DeleteToddlerModalComponent', () => {
  let component: DeleteToddlerModalComponent;
  let fixture: ComponentFixture<DeleteToddlerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteToddlerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteToddlerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
