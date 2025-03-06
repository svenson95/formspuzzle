import { CdkDrag, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  WritableSignal,
} from '@angular/core';

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
      background-color: var(--fp-color-brown);
    }
  `,
  template: `
    <div
      class="piece"
      [style.transform]="rotation ? 'rotate(' + rotation + 'deg)' : ''"
      (click)="rotatePiece()"
      cdkDrag
      (cdkDragEnded)="onDrop($event, piece())"
      (cdkDragStarted)="onDrag($event)"
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
  occupiedTiles = input.required<WritableSignal<PuzzleGrid>>();
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

  onDrag(event: CdkDragStart): void {
    // console.log('drag start', event);
  }

  onDrop(event: CdkDragEnd, piece: PuzzleGrid): void {
    console.log('dropped', event);
    console.log('piece', piece);

    const { x, y } = event.dropPoint;
    const dragPosition = event.source.getFreeDragPosition();

    const cells = this.getCellsInPieceArea(
      dragPosition,
      event.dropPoint,
      piece
    );
    console.log('cells', cells);
  }

  getCellsInPieceArea(
    dragPosition: { x: number; y: number },
    dropPoint: { x: number; y: number },
    piece: PuzzleGrid
  ) {
    const cells: { row: number; col: number }[] = [];

    // Convert dropPoint to grid coordinates
    const startCol = Math.round(dragPosition.x / this.gridSize);
    const startRow = Math.round(dragPosition.y / this.gridSize);

    // Loop through piece matrix
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[row].length; col++) {
        if (piece[row][col] === 1) {
          cells.push({
            row: startRow + row,
            col: startCol + col,
          });
        }
      }
    }

    return cells;
  }
}
