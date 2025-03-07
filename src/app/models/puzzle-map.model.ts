export type PuzzleName = string;
export type PuzzleGrid = PuzzleTileState[][];

export type PuzzleMap = {
  name: PuzzleName;
  grid: PuzzleGrid;
};

export enum PuzzleTileState {
  NONE = 0,
  TILE = 1,
  IS_HOVERED = 2,
  IS_OCCUPIED = 3,
}
