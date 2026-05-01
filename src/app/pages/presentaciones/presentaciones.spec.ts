import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Presentaciones } from './presentaciones';

describe('Presentaciones', () => {
  let component: Presentaciones;
  let fixture: ComponentFixture<Presentaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Presentaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(Presentaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
