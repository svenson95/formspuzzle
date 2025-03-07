import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

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
      (cdkDragEnded)="onDrop()"
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

  hoveredCells: Element[] = [];
  dragPosition = { x: 0, y: 0 };

  onDrag(event: CdkDragMove): void {
    const { nativeElement } = event.source.element;
    const pieceRect = nativeElement.getBoundingClientRect();

    this.setHoveredCells(pieceRect);
    this.updateHoveredTiles(PuzzleTileState.TILE);
    this.setHoveredCellsState(pieceRect);
  }

  private setHoveredCells(pieceRect: DOMRect): void {
    this.hoveredCells = [];
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

          if (tiles.length === 0) return;
          if (tiles.length > 1)
            throw new Error('Unexpectedly found multiple board-cells');

          this.hoveredCells.push(tiles[0]);
        }
      }
    }
  }

  private updateHoveredTiles(state: PuzzleTileState) {
    const occupiedTiles = this.puzzle.occupiedTiles();
    const tilesCopy = occupiedTiles.map((x) => Object.assign([], x));
    const tiles = tilesCopy.map((row) => {
      return row.map((cell) => {
        if (cell === PuzzleTileState.IS_HOVERED) {
          return state;
        }
        return cell;
      });
    });

    this.puzzle.occupiedTiles.set(tiles);
  }

  private setHoveredCellsState(pieceRect: DOMRect): void {
    const tiles: PuzzleGrid = this.puzzle
      .occupiedTiles()
      .map((x) => Object.assign([], x));

    this.hoveredCells.forEach((cellElement: Element) => {
      const id = cellElement.getAttribute('id');
      if (!id) throw new Error('Board cell attribute id is null');
      const row = Number(id.split('-')[1]) - 1;
      const col = Number(id.split('-')[2]) - 1;

      if (tiles[row][col] === PuzzleTileState.TILE) {
        tiles[row][col] = PuzzleTileState.IS_HOVERED;
      }
    });

    this.puzzle.occupiedTiles.set(tiles);
  }

  onDrop(): void {
    this.dragPosition = { x: 0, y: 0 };
    const isReadyToPlace = this.checkForOccupiedTiles(this.hoveredCells);
    this.hoveredCells = [];

    if (isReadyToPlace) {
      // TODO: change update hovered tiles to insert puzzle piece instance on grid
      this.updateHoveredTiles(PuzzleTileState.IS_OCCUPIED);
    } else {
      this.updateHoveredTiles(PuzzleTileState.TILE);
    }
  }

  private checkForOccupiedTiles(cells: Element[]): boolean {
    const occupiedTiles = cells.filter((t) =>
      t.classList.contains('is-occupied')
    );
    const hasOccupiedTiles = occupiedTiles.length > 0;
    return !hasOccupiedTiles;
  }
}
