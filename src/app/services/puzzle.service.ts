import { Injectable, signal } from '@angular/core';

import { EMPTY_MAP } from '../data';
import { PuzzleGrid, PuzzleMap } from '../models';

@Injectable()
export class PuzzleService {
  isGameStarted = signal<boolean>(false);
  selectedMap = signal<PuzzleMap | undefined>(undefined);
  occupiedTiles = signal<PuzzleGrid>(EMPTY_MAP.grid);
}
