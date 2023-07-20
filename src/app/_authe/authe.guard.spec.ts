import { TestBed } from '@angular/core/testing';

import { AutheGuard } from './authe.guard';

describe('AutheGuard', () => {
  let guard: AutheGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutheGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
