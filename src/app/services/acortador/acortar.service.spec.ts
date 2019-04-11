import { TestBed } from '@angular/core/testing';

import { AcortarService } from './acortar.service';

describe('AcortarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcortarService = TestBed.get(AcortarService);
    expect(service).toBeTruthy();
  });
});
