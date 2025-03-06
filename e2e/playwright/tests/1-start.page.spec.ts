import { expect, test } from '../poms';

test.beforeEach(async ({ page, startPage }) => {
  await page.goto(startPage.URL_WITH_PREFIX);
});

test.describe('StartPage', () => {
  test('has play button', async ({ startPage, chooseMapPage }) => {
    // Arrange: Get the start button.
    const playButton = startPage.getPlayButton();

    // Assert: play button is clickable and have proper label
    await expect(playButton).toBeEnabled();
    await expect(playButton).toHaveText('SPIELEN');
    await expect(playButton).toHaveAttribute(
      'routerLink',
      chooseMapPage.URL_WITH_PREFIX
    );
  });

  test('should redirect to choose-map after click play-button', async ({
    page,
    startPage,
    chooseMapPage,
  }) => {
    // Arrange: Get the start button.
    await startPage.isReady();
    await expect(page).toHaveURL(startPage.URL);
    const playButton = startPage.getPlayButton();

    // Act: click on start-button
    await playButton.click();

    // Assert: play button is clickable and have proper label
    await chooseMapPage.isReady();
    await expect(page).toHaveURL(chooseMapPage.URL);
  });
});
