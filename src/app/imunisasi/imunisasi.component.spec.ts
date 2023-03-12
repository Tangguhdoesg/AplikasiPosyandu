import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImunisasiComponent } from './imunisasi.component';

describe('ImunisasiComponent', () => {
  let component: ImunisasiComponent;
  let fixture: ComponentFixture<ImunisasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImunisasiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImunisasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
