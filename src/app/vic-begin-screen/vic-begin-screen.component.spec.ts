import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VicBeginScreenComponent } from './vic-begin-screen.component';

describe('VicBeginScreenComponent', () => {
  let component: VicBeginScreenComponent;
  let fixture: ComponentFixture<VicBeginScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VicBeginScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VicBeginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
