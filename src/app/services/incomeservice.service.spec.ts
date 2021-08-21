import { TestBed } from '@angular/core/testing';

import { IncomeserviceService } from './incomeservice.service';

describe('IncomeserviceService', () => {
  let service: IncomeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
