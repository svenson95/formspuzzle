import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { PuzzleMap } from '../models';

import { PuzzleService } from '../services';
import { PuzzleTileComponent } from './puzzle-tile.component';

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
  `,
  template: `
    <div class="grid">
      @for (row of map().grid; track $index; let rowIndex = $index) {
      <div class="row">
        @for (cell of row; track $index; let colIndex = $index) {
        <fp-puzzle-tile
          [rowIndex]="rowIndex"
          [colIndex]="colIndex"
          [state]="cell"
          [occupiedTiles]="puzzle.occupiedTiles()"
        />
        }
      </div>
      }
    </div>
  `,
  selector: 'fp-puzzle-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PuzzleTileComponent],
})
export class PuzzleBoardComponent {
  puzzle = inject(PuzzleService);
  map = input.required<PuzzleMap>();

  @HostBinding('attr.puzzle')
  get setPuzzleNameOnHost(): string {
    return this.map().name;
  }
}
