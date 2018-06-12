import { TestBed, inject } from '@angular/core/testing';

import { GamesByUserService } from './games-by-user.service';

describe('GamesByUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamesByUserService]
    });
  });

  it('should be created', inject([GamesByUserService], (service: GamesByUserService) => {
    expect(service).toBeTruthy();
  }));
});
