import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { PuzzleMap, PuzzleTileState } from '../models';
import { PuzzleService } from '../services';

@Component({
  styles: `
    :host {
      margin: 20px auto;
      display: flex;
      flex-direction: column;
      width: fit-content;

      &.preview {
        --fp-grid-default: 15px;

        @media only screen and (max-width: 600px) {
          --fp-grid-small: 15px;
        }
      }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(12, var(--fp-grid-default));
      grid-template-rows: repeat(12, var(--fp-grid-default));

      @media only screen and (max-width: 600px) {
        grid-template-columns: repeat(12, var(--fp-grid-small));
        grid-template-rows: repeat(12, var(--fp-grid-small));
      }
    }

    .board-cell {
      width: var(--fp-grid-default);
      height: var(--fp-grid-default);

      @media only screen and (max-width: 600px) {
        width: var(--fp-grid-small);
        height: var(--fp-grid-small);
      }

      &.is-part-of-map {
        background-color: #ddd;
        border: 1px solid #ccc;
      }

      &.is-hovered.is-part-of-map {
        background-color: #ccc;
      }
    }
  `,
  template: `
    <div class="grid">
      @for (row of map().grid; track $index; let rowIndex = $index) {
      <div class="row">
        @for (cell of row; track $index; let colIndex = $index) {
        <div
          class="board-cell"
          [id]="'cell-' + (rowIndex + 1) + '-' + (colIndex + 1)"
          [class.is-part-of-map]="cell === PuzzleTileState.TILE"
          [class.is-hovered]="isHovered(rowIndex, colIndex)"
        ></div>
        }
      </div>
      }
    </div>
  `,
  selector: 'fp-puzzle-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class PuzzleBoardComponent {
  readonly PuzzleTileState = PuzzleTileState;

  map = input.required<PuzzleMap>();
  puzzle = inject(PuzzleService);
  occupiedTiles = this.puzzle.occupiedTiles;

  @HostBinding('attr.puzzle')
  get setPuzzleNameOnHost(): string {
    return this.map().name;
  }

  isHovered(row: number, col: number): boolean {
    const tiles = this.occupiedTiles();
    if (!tiles) return false;
    return tiles[row][col] === PuzzleTileState.IS_HOVERED ? true : false;
  }
}
