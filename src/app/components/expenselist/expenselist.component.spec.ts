import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenselistComponent } from './expenselist.component';

describe('ExpenselistComponent', () => {
  let component: ExpenselistComponent;
  let fixture: ComponentFixture<ExpenselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
