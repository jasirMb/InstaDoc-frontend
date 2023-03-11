import { TestBed } from '@angular/core/testing';

import { BlockIntercepterService } from './block-intercepter.service';

describe('BlockIntercepterService', () => {
  let service: BlockIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockIntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
