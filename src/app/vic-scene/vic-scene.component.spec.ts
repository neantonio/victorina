import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VicSceneComponent } from './vic-scene.component';

describe('VicSceneComponent', () => {
  let component: VicSceneComponent;
  let fixture: ComponentFixture<VicSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VicSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VicSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
