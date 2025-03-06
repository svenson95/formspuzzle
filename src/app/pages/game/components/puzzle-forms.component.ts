import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PuzzleGrid } from '../../../models';

import { PuzzlePieceComponent } from './puzzle-piece.component';

@Component({
  styles: `
    :host {
      background-color: var(--fp-color-white);
      margin-bottom: 2rem;
    }
  `,
  template: `
    @for (piece of pieces; track $index) {
    <fp-puzzle-piece [piece]="piece" [grid]="grid()" />
    }
  `,
  selector: 'fp-puzzle-forms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PuzzlePieceComponent],
})
export class PuzzleFormsComponent {
  grid = input.required<PuzzleGrid>();

  readonly pieces = [
    [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
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
}
