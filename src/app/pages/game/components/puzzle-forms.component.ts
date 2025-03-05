import {
  ChangeDetectionStrategy,
  Component,
  input,
  WritableSignal,
} from '@angular/core';

import { PuzzleGrid } from '../../../models';

import { PuzzlePieceComponent } from './puzzle-piece.component';

@Component({
  styles: ``,
  template: `
    <div class="pieces">
      @for (piece of pieces; track $index) {
      <fp-puzzle-piece
        [piece]="piece"
        [grid]="grid()"
        [occupiedTiles]="occupiedTiles()"
      />
      }
    </div>
  `,
  selector: 'fp-puzzle-forms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PuzzlePieceComponent],
})
export class PuzzleFormsComponent {
  grid = input.required<PuzzleGrid>();
  occupiedTiles = input.required<WritableSignal<PuzzleGrid>>();

  readonly pieces = [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
    ],
  ];

  placePuzzlePiece(): void {
    console.log('logic for placing piece');
  }
}
