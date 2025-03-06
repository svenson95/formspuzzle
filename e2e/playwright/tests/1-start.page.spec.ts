import { expect, test } from '@playwright/test';

const PLAY_BUTTON_TESTID = 'play-button';

test.beforeEach(async ({ page }) => {
  await page.goto('/start');
});

test.describe('StartPage', () => {
  test('has play button', async ({ page }) => {
    // Arrange: Get the start button.
    const playButton = page.getByTestId(PLAY_BUTTON_TESTID);

    // Assert: play button is clickable and have proper label
    await expect(playButton).toBeEnabled();
    await expect(playButton).toHaveText('SPIELEN');
    await expect(playButton).toHaveAttribute('routerLink', '/choose-map');
  });

  test('should redirect to choose-map after click play-button', async ({
    page,
  }) => {
    // Arrange: Get the start button.
    const playButton = page.getByTestId(PLAY_BUTTON_TESTID);

    // Act: click on start-button
    await expect(page).toHaveURL('start');
    await playButton.click();

    // Assert: play button is clickable and have proper label
    await expect(page).toHaveURL('choose-map');
  });
});
