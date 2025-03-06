import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PuzzleService } from '../../services';

import { ChooseMapPage } from './choose-map.page';

describe('ChooseMapPage', () => {
  let component: ChooseMapPage;
  let fixture: ComponentFixture<ChooseMapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseMapPage],
      providers: [PuzzleService, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
