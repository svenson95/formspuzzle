import { CdkDrag, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { PuzzleService } from 'src/app/services';
import { PuzzleGrid } from '../../../models';

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

    .cell {
      width: var(--fp-grid-default);
      height: var(--fp-grid-default);
      display: inline-block;

      @media only screen and (max-width: 600px) {
        width: var(--fp-grid-small);
        height: var(--fp-grid-small);
      }
    }

    .cell.filled {
      background-color: var(--ion-color-primary);
    }
  `,
  template: `
    <div
      class="piece"
      [style.transform]="rotation ? 'rotate(' + rotation + 'deg)' : ''"
      (click)="rotatePiece()"
      cdkDrag
      (cdkDragEnded)="onDrop($event, piece())"
      (cdkDragMoved)="onDrag($event)"
    >
      @for (row of piece(); track $index) {
      <div class="row">
        @for (cell of row; track $index) {
        <div class="cell" [class.filled]="cell === 1"></div>
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

  rotation: number = 0;
  gridSize: number = 20;

  rotatePiece(): void {
    // this.rotation = (this.rotation + 90) % 360;
    // const pieceMatrix = this.rotateMatrix(this.piece());
    // this.piece2.set(pieceMatrix);
  }

  rotateMatrix(matrix: PuzzleGrid): PuzzleGrid {
    const n = matrix.length;
    let result: PuzzleGrid = [];
    for (let i = 0; i < n; i++) {
      result[i] = [];
      for (let j = 0; j < n; j++) {
        result[i][j] = matrix[n - j - 1][i];
      }
    }
    return result;
  }

  onDrag(event: CdkDragMove): void {
    // console.log('drag start', event);
  }

  onDrop(event: CdkDragEnd, piece: PuzzleGrid): void {
    console.log('element', event);

    const dropPoint = event.dropPoint;

    // const allDropPointElements = document.elementsFromPoint(
    //   dropPoint.x,
    //   dropPoint.y
    // );
    // const elements = allDropPointElements.filter((v) =>
    //   v.classList.contains('board-cell')
    // );
    const pieceRect =
      event.source.element.nativeElement.getBoundingClientRect();
    console.log('hovered grids', this.getHoveredCellIds(pieceRect, piece));
    console.log('TEST', this.puzzle.occupiedTiles());

    this.getHoveredCellIds(pieceRect, piece).forEach((cell: string) => {
      const cellRow = Number(cell.substring(5, cell.lastIndexOf('-')));
      const cellCol = Number(
        cell.substring(cell.lastIndexOf('-') + 1, cell.length)
      );

      const data = [...this.puzzle.occupiedTiles()];
      data[cellRow - 1][cellCol - 1] = 1;
      this.puzzle.occupiedTiles.set(data);
    });
  }

  getHoveredCellIds(dropPoint: DOMRect, piece: PuzzleGrid): string[] {
    console.log('dropPoint', dropPoint);
    const hoveredCells: string[] = [];
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

          const tileId = tile.getAttribute('id');
          if (typeof tileId !== 'string') {
            throw new Error(
              'Get Hovered Cells failed during tile.getAttribute() method'
            );
          }
          hoveredCells.push(tileId);
        }
      }
    }
    return hoveredCells;
  }
}
