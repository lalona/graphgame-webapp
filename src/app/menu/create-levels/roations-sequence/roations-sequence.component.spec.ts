import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoationsSequenceComponent } from './roations-sequence.component';

describe('RoationsSequenceComponent', () => {
  let component: RoationsSequenceComponent;
  let fixture: ComponentFixture<RoationsSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoationsSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoationsSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
