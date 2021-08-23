import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashhomeComponent } from './dashhome.component';

describe('DashhomeComponent', () => {
  let component: DashhomeComponent;
  let fixture: ComponentFixture<DashhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
