import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotMainScreenComponent } from './rot-main-screen.component';

describe('RotMainScreenComponent', () => {
  let component: RotMainScreenComponent;
  let fixture: ComponentFixture<RotMainScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotMainScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotMainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
