import { TestBed, inject } from '@angular/core/testing';

import { MyRouterService } from './my-router.service';

describe('MyRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyRouterService]
    });
  });

  it('should be created', inject([MyRouterService], (service: MyRouterService) => {
    expect(service).toBeTruthy();
  }));
});
