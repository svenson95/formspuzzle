import { expect, test } from '../poms';

test.beforeEach(async ({ page, chooseMapPage }) => {
  await page.goto(chooseMapPage.URL_WITH_PREFIX);
});

test.describe('ChooseMapPage', () => {
  test('has map preview with default "cross"', async ({ chooseMapPage }) => {
    // Arrange: Get the start button.
    const mapElement = chooseMapPage.getMapPreview().first();

    // Assert: play button is clickable and have proper label
    await expect(mapElement).toBeVisible();
    await expect(mapElement).toHaveAttribute('puzzle', 'cross');
  });

  test('has start button', async ({ page, chooseMapPage, gamePage }) => {
    // Arrange: Get the start button.
    const startButton = chooseMapPage.getStartButton();

    // Assert: play button is clickable and have proper label
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
    await expect(startButton).toHaveText('START');
    await expect(startButton).toHaveAttribute(
      'routerLink',
      gamePage.URL_WITH_PREFIX
    );
  });

  test('can navigate to next route', async ({
    page,
    chooseMapPage,
    gamePage,
  }) => {
    // Arrange: Get the start button.
    await chooseMapPage.isReady();
    expect(page).toHaveURL(chooseMapPage.URL);
    const startButton = chooseMapPage.getStartButton();

    // Act: click on start-button
    await startButton.click();

    // Assert: Expects page to have a heading with the name of Installation.
    await gamePage.isReady();
    expect(page).toHaveURL(gamePage.URL);
  });
});
