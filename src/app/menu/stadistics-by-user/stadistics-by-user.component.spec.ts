import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StadisticsByUserComponent } from './stadistics-by-user.component';

describe('StadisticsByUserComponent', () => {
  let component: StadisticsByUserComponent;
  let fixture: ComponentFixture<StadisticsByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadisticsByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadisticsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
