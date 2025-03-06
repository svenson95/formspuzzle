import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { PuzzleBoardComponent } from '../../components';
import { PuzzleMap } from '../../models';
import { PuzzleService } from '../../services';

import { PuzzleFormsComponent } from './components';

@Component({
  styles: `
    .game-header {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
    }
  `,
  template: `
    <section class="game-header">
      <div>Zeit:</div>
      <div>00:00</div>
    </section>
    <fp-puzzle-board #board [map]="selectedMap()" />
    <fp-puzzle-forms
      [grid]="selectedMap().grid"
      [occupiedTiles]="board.occupiedTiles"
    />
  `,
  host: {
    'data-testid': 'game-page-root',
  },
  selector: 'fp-game-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PuzzleBoardComponent, PuzzleFormsComponent],
})
export class GamePage {
  puzzle = inject(PuzzleService);
  selectedMap = computed<PuzzleMap>(() => {
    const map = this.puzzle.selectedMap();
    if (map === undefined) {
      throw new Error('Map should be defined in game page');
    }
    return map;
  });
}
