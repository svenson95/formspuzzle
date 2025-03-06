import { test as base } from '@playwright/test';
import { ChooseMapPOM } from './choose-map.page.pom';
import { GamePOM } from './game.page.pom';
import { StartPOM } from './start.page.pom';

type MyFixtures = {
  startPage: StartPOM;
  chooseMapPage: ChooseMapPOM;
  gamePage: GamePOM;
};

export const test = base.extend<MyFixtures>({
  startPage: async ({ page }, use) => await use(new StartPOM(page)),
  chooseMapPage: async ({ page }, use) => await use(new ChooseMapPOM(page)),
  gamePage: async ({ page }, use) => await use(new GamePOM(page)),
});

export { expect } from '@playwright/test';
