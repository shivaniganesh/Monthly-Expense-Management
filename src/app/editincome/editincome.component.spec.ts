import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditincomeComponent } from './editincome.component';

describe('EditincomeComponent', () => {
  let component: EditincomeComponent;
  let fixture: ComponentFixture<EditincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditincomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
