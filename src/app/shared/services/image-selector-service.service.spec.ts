import { TestBed } from '@angular/core/testing';

import { ImageSelectorServiceService } from './image-selector-service.service';

describe('ImageSelectorServiceService', () => {
  let service: ImageSelectorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSelectorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
