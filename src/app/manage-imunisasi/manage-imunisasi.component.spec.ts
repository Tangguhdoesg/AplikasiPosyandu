import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageImunisasiComponent } from './manage-imunisasi.component';

describe('ManageImunisasiComponent', () => {
  let component: ManageImunisasiComponent;
  let fixture: ComponentFixture<ManageImunisasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageImunisasiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageImunisasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
