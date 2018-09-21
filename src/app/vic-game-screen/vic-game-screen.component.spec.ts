import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VicGameScreenComponent } from './vic-game-screen.component';

describe('VicGameScreenComponent', () => {
  let component: VicGameScreenComponent;
  let fixture: ComponentFixture<VicGameScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VicGameScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VicGameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
