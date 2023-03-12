import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImunisasiModalComponent } from './add-imunisasi-modal.component';

describe('AddImunisasiModalComponent', () => {
  let component: AddImunisasiModalComponent;
  let fixture: ComponentFixture<AddImunisasiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImunisasiModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImunisasiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
