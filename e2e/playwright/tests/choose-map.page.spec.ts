import { expect, test } from '@playwright/test';

const START_BUTTON_TESTID = 'start-button';
const PUZZLE_BOARD_PREVIEW_TESTID = 'puzzle-board-preview';

test.beforeEach(async ({ page }) => {
  await page.goto('/choose-map');
});

test.describe('ChooseMapPage', () => {
  test('has start button', async ({ page }) => {
    // Arrange: Get the start button.
    const playButton = page.getByTestId(START_BUTTON_TESTID);

    // Assert: play button is clickable and have proper label
    await expect(playButton).toBeEnabled();
    await expect(playButton).toHaveText('START');
    await expect(playButton).toHaveAttribute('routerLink', '/game');
  });

  test('has default selected map "cross"', async ({ page }) => {
    // Arrange: Get the start button.
    const puzzleBoardPreview = page.getByTestId(PUZZLE_BOARD_PREVIEW_TESTID);

    // Assert: play button is clickable and have proper label
    await expect(puzzleBoardPreview).toHaveAttribute('puzzle', 'cross');
  });

  test('can navigate to next route', async ({ page }) => {
    // Arrange: Get the start button.
    const playButton = page.getByTestId(START_BUTTON_TESTID);

    // Act: click on start-button
    expect(page).toHaveURL('/choose-map');
    playButton.click();

    // Assert: Expects page to have a heading with the name of Installation.
    expect(page).toHaveURL('/game');
  });
});
