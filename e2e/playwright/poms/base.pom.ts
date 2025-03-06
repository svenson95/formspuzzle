import { Page, expect } from '@playwright/test';

export abstract class BasePOM {
  abstract URL: string;
  abstract URL_WITH_PREFIX: string;

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getUrlWithPrefix(): string {
    return '/' + this.URL;
  }

  async isReady(): Promise<void> {
    const pageRoot = this.page.getByTestId(this.URL + '-page-root');
    return await expect(pageRoot).toBeVisible();
  }
}
