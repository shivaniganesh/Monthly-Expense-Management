import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeinspiredComponent } from './beinspired.component';

describe('BeinspiredComponent', () => {
  let component: BeinspiredComponent;
  let fixture: ComponentFixture<BeinspiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeinspiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeinspiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
