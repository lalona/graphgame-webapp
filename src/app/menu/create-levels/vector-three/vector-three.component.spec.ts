import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorThreeComponent } from './vector-three.component';

describe('VectorThreeComponent', () => {
  let component: VectorThreeComponent;
  let fixture: ComponentFixture<VectorThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
