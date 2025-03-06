import { expect, test } from '@playwright/test';

const START_BUTTON_TESTID = 'start-button';
const MAP_PREVIEW_TESTID = 'map-preview';

test.beforeEach(async ({ page }) => {
  await page.goto('/choose-map');
});

test.describe('ChooseMapPage', () => {
  test('has default selected map "cross"', async ({ page }) => {
    // Arrange: Get the start button.
    const mapElement = page.getByTestId(MAP_PREVIEW_TESTID).first();

    // Assert: play button is clickable and have proper label
    await expect(mapElement).toHaveAttribute('puzzle', 'cross');
  });

  test('has start button', async ({ page }) => {
    // Arrange: Get the start button.
    const startButton = page.getByTestId(START_BUTTON_TESTID);

    // Assert: play button is clickable and have proper label
    await expect(startButton).toBeEnabled();
    await expect(startButton).toHaveText('START');
    await expect(startButton).toHaveAttribute('routerLink', '/game');
  });

  test('can navigate to next route', async ({ page }) => {
    // Arrange: Get the start button.
    expect(page).toHaveURL('choose-map');
    const startButton = page.getByTestId(START_BUTTON_TESTID);

    // Act: click on start-button
    await startButton.click();

    // Assert: Expects page to have a heading with the name of Installation.
    expect(page).toHaveURL('game');
  });
});
