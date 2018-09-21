import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VicModalControllerComponent } from './vic-modal-controller.component';

describe('VicModalControllerComponent', () => {
  let component: VicModalControllerComponent;
  let fixture: ComponentFixture<VicModalControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VicModalControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VicModalControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
