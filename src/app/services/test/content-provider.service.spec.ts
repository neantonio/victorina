import { TestBed, inject } from '@angular/core/testing';

import { ContentProviderService } from './content-provider.service';

describe('ContentProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentProviderService]
    });
  });

  it('should be created', inject([ContentProviderService], (service: ContentProviderService) => {
    expect(service).toBeTruthy();
  }));
});
