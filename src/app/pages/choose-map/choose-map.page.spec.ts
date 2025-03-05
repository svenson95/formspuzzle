import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMapPage } from './choose-map.page';

describe('ChooseMapPage', () => {
  let component: ChooseMapPage;
  let fixture: ComponentFixture<ChooseMapPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ChooseMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
