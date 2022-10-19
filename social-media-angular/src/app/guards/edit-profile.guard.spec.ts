import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EditProfileGuard } from './edit-profile.guard';

describe('EditProfileGuard', () => {
  let guard: EditProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpClient], imports: [HttpClientTestingModule]});
    guard = TestBed.inject(EditProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
