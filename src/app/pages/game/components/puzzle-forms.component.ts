import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PUZZLE_PIECES } from '../../../data';

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
    <fp-puzzle-piece [piece]="piece" />
    }
  `,
  selector: 'fp-puzzle-forms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PuzzlePieceComponent],
})
export class PuzzleFormsComponent {
  readonly pieces = PUZZLE_PIECES;
}
