import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VicTextDialogComponent } from './vic-text-dialog.component';

describe('VicTextDialogComponent', () => {
  let component: VicTextDialogComponent;
  let fixture: ComponentFixture<VicTextDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VicTextDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VicTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
