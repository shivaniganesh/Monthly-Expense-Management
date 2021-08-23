import { TestBed } from '@angular/core/testing';

import { ExpenseserviceService } from './expenseservice.service';

describe('ExpenseserviceService', () => {
  let service: ExpenseserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
