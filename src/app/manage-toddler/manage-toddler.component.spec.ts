import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageToddlerComponent } from './manage-toddler.component';

describe('ManageToddlerComponent', () => {
  let component: ManageToddlerComponent;
  let fixture: ComponentFixture<ManageToddlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageToddlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageToddlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
