import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  signal,
} from '@angular/core';

import { PUZZLE_MAPS } from '../data';
import { PuzzleGrid, PuzzleMap } from '../models';

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

    .cell {
      width: var(--fp-grid-default);
      height: var(--fp-grid-default);

      @media only screen and (max-width: 600px) {
        width: var(--fp-grid-small);
        height: var(--fp-grid-small);
      }
    }

    .cell.active {
      background-color: #ddd;
      border: 1px solid #ccc;
    }
  `,
  template: `
    <div class="grid">
      @for (row of map().grid; track $index; let rowIndex = $index) {
      <div class="row" [id]="'grid-row-' + rowIndex + 1">
        @for (cell of row; track $index; let colIndex = $index) {
        <div
          class="cell"
          [id]="'grid-cell-row-' + rowIndex + '-col-' + colIndex"
          [class.active]="cell === 1"
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
  map = input.required<PuzzleMap>();
  occupiedTiles = signal<PuzzleGrid>(PUZZLE_MAPS[0].grid);

  @HostBinding('attr.puzzle') get setPuzzleNameOnHost(): string {
    return this.map().name;
  }
}
