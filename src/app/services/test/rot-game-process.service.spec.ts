import { TestBed, inject } from '@angular/core/testing';

import { RotGameProcessService } from './rot-game-process.service';

describe('RotGameProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RotGameProcessService]
    });
  });

  it('should be created', inject([RotGameProcessService], (service: RotGameProcessService) => {
    expect(service).toBeTruthy();
  }));
});
