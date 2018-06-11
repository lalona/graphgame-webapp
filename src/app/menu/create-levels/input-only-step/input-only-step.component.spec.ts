import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOnlyStepComponent } from './input-only-step.component';

describe('InputOnlyStepComponent', () => {
  let component: InputOnlyStepComponent;
  let fixture: ComponentFixture<InputOnlyStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputOnlyStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOnlyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
