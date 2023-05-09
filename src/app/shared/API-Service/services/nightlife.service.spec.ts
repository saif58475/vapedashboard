import { TestBed } from '@angular/core/testing';

import { NightlifeService } from './nightlife.service';

describe('NightlifeService', () => {
  let service: NightlifeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NightlifeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
