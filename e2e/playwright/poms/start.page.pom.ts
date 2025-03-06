import { Locator } from '@playwright/test';

import { BasePOM } from './base.pom';

export class StartPOM extends BasePOM {
  readonly URL = 'start';
  readonly URL_WITH_PREFIX = this.getUrlWithPrefix();

  readonly PLAY_BUTTON_TESTID = 'start-play-button';

  getPlayButton(): Locator {
    return this.page.getByTestId(this.PLAY_BUTTON_TESTID);
  }
}
