import { TestBed } from '@angular/core/testing';

import { CafetablesService } from './cafetables.service';

describe('CafetablesService', () => {
  let service: CafetablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CafetablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
