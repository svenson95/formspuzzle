import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

import { PuzzleBoardComponent } from '../../components';
import { DEFAULT_MAP, PUZZLE_MAPS } from '../../data';
import { PuzzleMap } from '../../models';
import { PuzzleService } from '../../services';

@Component({
  styles: `
    #choose-map-header {
      font-size: 2rem;
      font-weight: 900;
      text-align: center;
      padding-block: 3rem;
    }

    #choose-map-selection {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      display: flex;
      gap: 2rem;
    }

    #choose-map-menu {
      position: absolute;
      transform: translateY(-80%);
      top: 80%;
      left: 0;
      right: 0;

      text-align: center;
    }
  `,
  template: `
    <section id="choose-map-header">Karte wählen</section>
    <section id="choose-map-selection">
      <!-- @for (map of maps; track map.name) { -->
      <fp-puzzle-board
        class="preview"
        [map]="defaultMap"
        data-testid="puzzle-board-preview"
        #board
      />
      <!-- } -->
    </section>
    <section id="choose-map-menu">
      <ion-button
        data-testid="start-button"
        routerLink="/game"
        (click)="onRouting(defaultMap)"
      >
        START
      </ion-button>
    </section>
  `,
  selector: 'fp-choose-map-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton, RouterLink, PuzzleBoardComponent],
})
export class ChooseMapPage {
  puzzle = inject(PuzzleService);

  readonly maps = PUZZLE_MAPS;
  readonly defaultMap = DEFAULT_MAP;

  onRouting(map: PuzzleMap): void {
    this.puzzle.selectedMap.set(map);
  }
}
