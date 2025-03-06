import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DEFAULT_MAP } from '../data';

import { PuzzleBoardComponent } from './puzzle-board.component';

describe('PuzzleBoardComponent', () => {
  let fixture: ComponentFixture<PuzzleBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleBoardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PuzzleBoardComponent);
  });

  it('should set host attribute \'puzzle="mapName"\'', () => {
    // Arrange
    fixture.componentRef.setInput('map', DEFAULT_MAP);

    // Act
    const selectedMap = fixture.componentInstance.map().name;
    const hostElement: boolean = fixture.nativeElement.matches(
      `[puzzle="${selectedMap}"]`
    );

    // Assert
    expect(hostElement).toBeFalse();
  });
});
