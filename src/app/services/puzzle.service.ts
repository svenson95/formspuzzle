import { Injectable, signal } from '@angular/core';

import { PuzzleMap } from '../models';

@Injectable()
export class PuzzleService {
  isGameStarted = signal<boolean>(false);
  selectedMap = signal<PuzzleMap | undefined>(undefined);
}
