import { CdkDrag, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { EMPTY_MAP } from '../../../data';
import { PuzzleGrid } from '../../../models';
import { PuzzleService } from '../../../services';

@Component({
  styles: `
    .piece {
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
      class="piece"
      [style.transform]="rotation ? 'rotate(' + rotation + 'deg)' : ''"
      cdkDrag
      [cdkDragFreeDragPosition]="dragPosition"
      (cdkDragMoved)="onDrag($event, piece())"
      (cdkDragEnded)="onDrop($event, piece())"
    >
      @for (row of piece(); track $index) {
      <div class="row">
        @for (cell of row; track $index) {
        <div class="piece-tile" [class.is-part-of-piece]="cell === 1"></div>
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
  piece = input.required<PuzzleGrid>();
  grid = input.required<PuzzleGrid>();

  puzzle = inject(PuzzleService);

  gridSize: number = 20;
  rotation: number = 0;
  dragPosition = { x: 0, y: 0 };

  onDrag(event: CdkDragMove, piece: PuzzleGrid): void {
    const pieceElement = event.source.element.nativeElement;
    const pieceRect = pieceElement.getBoundingClientRect();

    const data: PuzzleGrid = EMPTY_MAP.grid.map((x) => Object.assign([], x));
    this.getHoveredCellIds(pieceRect, piece).forEach((tile: Element) => {
      const id: string = tile.getAttribute('id') || 'INVALID-CELL-ID';
      const cellRow = Number(id.split('-')[1]);
      const cellCol = Number(id.split('-')[2]);

      data[cellRow - 1][cellCol - 1] = 2;
    });
    this.puzzle.occupiedTiles.set(data);
  }

  private getHoveredCellIds(dropPoint: DOMRect, piece: PuzzleGrid): Element[] {
    const hoveredCells: Element[] = [];
    const cellWidth = dropPoint.width / piece[0].length;
    const cellHeight = dropPoint.height / piece.length;
    const halfCellWidth = cellWidth / 2;
    const halfCellHeight = cellHeight / 2;

    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[row].length; col++) {
        if (piece[row][col] === 1) {
          const cellX = dropPoint.x + col * cellWidth + halfCellWidth;
          const cellY = dropPoint.y + row * cellHeight + halfCellHeight;
          const tile = document
            .elementsFromPoint(cellX, cellY)
            .filter((v) => v.classList.contains('board-cell'))[0];
          if (!tile) return [];
          hoveredCells.push(tile);
        }
      }
    }
    return hoveredCells;
  }

  onDrop(event: CdkDragEnd, piece: PuzzleGrid): void {
    // should align the piece into the grid
  }
}
