import { TestBed, inject } from '@angular/core/testing';

import { GameProcessService } from './game-process.service';

describe('GameProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameProcessService]
    });
  });

  it('should be created', inject([GameProcessService], (service: GameProcessService) => {
    expect(service).toBeTruthy();
  }));
});
