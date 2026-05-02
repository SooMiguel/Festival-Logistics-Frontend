import { TestBed } from '@angular/core/testing';

import { Escenario } from './escenario.service';

describe('Escenario', () => {
  let service: Escenario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Escenario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
