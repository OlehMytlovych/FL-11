import { TestBed } from '@angular/core/testing';

import { NewsLinesService } from './news-lines.service';

describe('NewsLinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsLinesService = TestBed.get(NewsLinesService);
    expect(service).toBeTruthy();
  });
});
