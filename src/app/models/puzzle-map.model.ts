import { PuzzleTileState } from './puzzle-tile.model';

export type PuzzleName = string;
export type PuzzleGrid = PuzzleTileState[][];

export type PuzzleMap = {
  name: PuzzleName;
  grid: PuzzleGrid;
};
