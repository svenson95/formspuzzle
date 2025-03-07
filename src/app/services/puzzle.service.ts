import { Injectable, signal } from '@angular/core';

import { PUZZLE_MAPS } from '../data';
import { PuzzleGrid, PuzzleMap } from '../models';

@Injectable()
export class PuzzleService {
  readonly DEFAULT_MAP = PUZZLE_MAPS[0];

  isGameStarted = signal<boolean>(false);
  selectedMap = signal<PuzzleMap>(this.DEFAULT_MAP);
  occupiedTiles = signal<PuzzleGrid>(this.DEFAULT_MAP.grid);
}
