import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { PuzzleGrid, PuzzleTileState } from '../models';

@Component({
  styles: `
    :host .board-cell {
      width: var(--fp-grid-default);
      height: var(--fp-grid-default);

      @media only screen and (max-width: 600px) {
        width: var(--fp-grid-small);
        height: var(--fp-grid-small);
      }

      &.is-part-of-map:not(.is-occupied) {
        background-color: #ddd;
        border: 1px solid #ccc;
      }

      &.is-hovered.is-part-of-map {
        background-color: #ccc;
      }

      &.is-occupied.is-part-of-map {
        background-color: var(--ion-color-primary);
      }
    }
  `,
  template: `
    <div
      class="board-cell"
      [id]="'cell-' + (rowIndex() + 1) + '-' + (colIndex() + 1)"
      [class.is-part-of-map]="state() === PuzzleTileState.TILE"
      [class.is-hovered]="isHovered()"
      [class.is-occupied]="isOccupied()"
    ></div>
  `,
  selector: 'fp-puzzle-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class PuzzleTileComponent {
  PuzzleTileState = PuzzleTileState;

  state = input.required<PuzzleTileState>();
  rowIndex = input.required<number>();
  colIndex = input.required<number>();
  occupiedTiles = input.required<PuzzleGrid>();

  isHovered = computed<boolean>(() => {
    const tile = this.getTileFromOccupiedTiles();
    return tile === PuzzleTileState.IS_HOVERED ? true : false;
  });

  isOccupied = computed<boolean>(() => {
    const tile = this.getTileFromOccupiedTiles();
    return tile === PuzzleTileState.IS_OCCUPIED ? true : false;
  });

  private getTileFromOccupiedTiles(): PuzzleTileState {
    const tiles = this.occupiedTiles();
    return tiles[this.rowIndex()][this.colIndex()];
  }
}
