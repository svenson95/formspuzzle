import { Injectable, signal } from '@angular/core';

import { PuzzleGrid, PuzzleMap } from '../models';

@Injectable()
export class PuzzleService {
  isGameStarted = signal<boolean>(false);
  selectedMap = signal<PuzzleMap | undefined>(undefined);
  occupiedTiles = signal<PuzzleGrid | undefined>(undefined); // TODO init value should be selected map
}
