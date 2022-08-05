import { TestBed } from '@angular/core/testing';

import { AllRequestsService } from './all-requests.service';

describe('AllRequestsService', () => {
  let service: AllRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
