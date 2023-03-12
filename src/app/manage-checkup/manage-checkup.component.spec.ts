import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCheckupComponent } from './manage-checkup.component';

describe('ManageCheckupComponent', () => {
  let component: ManageCheckupComponent;
  let fixture: ComponentFixture<ManageCheckupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCheckupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
