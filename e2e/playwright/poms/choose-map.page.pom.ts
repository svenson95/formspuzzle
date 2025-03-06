import { Locator } from '@playwright/test';

import { BasePOM } from './base.pom';

export class ChooseMapPOM extends BasePOM {
  readonly URL = 'choose-map';
  readonly URL_WITH_PREFIX = this.getUrlWithPrefix();

  readonly START_BUTTON_TESTID = 'choose-map-start-button';
  readonly MAP_PREVIEW_TESTID = 'choose-map-preview';

  getStartButton(): Locator {
    return this.page.getByTestId(this.START_BUTTON_TESTID);
  }

  getMapPreview(): Locator {
    return this.page.getByTestId(this.MAP_PREVIEW_TESTID);
  }
}
