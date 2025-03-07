import { CdkDrag, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { EMPTY_MAP } from '../../../data';
import { PuzzleGrid, PuzzleTileState } from '../../../models';
import { PuzzleService } from '../../../services';

@Component({
  styles: `
    :host > div {
      display: inline-block;
      margin: 10px;
      cursor: pointer;
    }

    .row {
      display: flex;
    }

    .piece-tile {
      width: var(--fp-grid-default);
      height: var(--fp-grid-default);
      display: inline-block;

      @media only screen and (max-width: 600px) {
        width: var(--fp-grid-small);
        height: var(--fp-grid-small);
      }

      &.is-part-of-piece {
        background-color: var(--ion-color-primary);
      }
    }
  `,
  template: `
    <div
      cdkDrag
      [cdkDragFreeDragPosition]="dragPosition"
      (cdkDragMoved)="onDrag($event)"
      (cdkDragEnded)="onDrop($event)"
    >
      @for (row of piece(); track $index) {
      <div class="row">
        @for (cell of row; track $index) {
        <div
          class="piece-tile"
          [class.is-part-of-piece]="cell === PuzzleTileState.TILE"
        ></div>
        }
      </div>
      }
    </div>
  `,
  selector: 'fp-puzzle-piece',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDrag],
})
export class PuzzlePieceComponent {
  readonly PuzzleTileState = PuzzleTileState;
  readonly gridSize: number = 20;

  readonly piece = input.required<PuzzleGrid>();
  readonly puzzle = inject(PuzzleService);

  dragPosition = { x: 0, y: 0 };

  onDrag(event: CdkDragMove): void {
    const pieceElement = event.source.element.nativeElement;
    const pieceRect = pieceElement.getBoundingClientRect();

    this.updateOccupiedTiles(pieceRect);
  }

  private updateOccupiedTiles(pieceRect: DOMRect) {
    const tiles: PuzzleGrid = EMPTY_MAP.grid.map((x) => Object.assign([], x));

    this.getHoveredCellIds(pieceRect).forEach((cell: Element) => {
      const id = cell.getAttribute('id');
      if (!id) throw new Error('Board cell attribute id is null');
      const row = Number(id.split('-')[1]) - 1;
      const col = Number(id.split('-')[2]) - 1;

      tiles[row][col] = PuzzleTileState.IS_HOVERED;
    });

    this.puzzle.occupiedTiles.set(tiles);
  }

  private getHoveredCellIds(pieceRect: DOMRect): Element[] {
    const hoveredCells: Element[] = [];
    const piece = this.piece();
    const halfCellSize = this.gridSize / 2;

    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[row].length; col++) {
        if (piece[row][col] === PuzzleTileState.TILE) {
          const cellX = pieceRect.x + col * this.gridSize + halfCellSize;
          const cellY = pieceRect.y + row * this.gridSize + halfCellSize;

          const tiles: Element[] = document
            .elementsFromPoint(cellX, cellY)
            .filter((v) => v.classList.contains('is-part-of-map'));

          if (tiles.length === 0) return [];
          if (tiles.length > 1)
            throw new Error('Unexpectedly found multiple board-cells');

          hoveredCells.push(tiles[0]);
        }
      }
    }

    return hoveredCells;
  }

  onDrop(event: CdkDragEnd): void {
    // should align the piece into the grid
  }
}
