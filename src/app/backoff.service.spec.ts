import { TestBed } from '@angular/core/testing';

import { BackoffService } from './backoff.service';

describe('BackoffService', () => {
  let service: BackoffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackoffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
