import { TestBed } from '@angular/core/testing';

import { RedireccionService } from './redireccion.service';

describe('RedireccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedireccionService = TestBed.get(RedireccionService);
    expect(service).toBeTruthy();
  });
});
