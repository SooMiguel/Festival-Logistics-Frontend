import { TestBed } from '@angular/core/testing';

import { Presentacion } from './presentacion.service';

describe('Presentacion', () => {
  let service: Presentacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Presentacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
