import { TestBed } from '@angular/core/testing';

import { Locations } from './locations';

describe('Locations', () => {
  let service: Locations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Locations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
