import { BasePOM } from './base.pom';

export class GamePOM extends BasePOM {
  readonly URL = 'game';
  readonly URL_WITH_PREFIX = this.getUrlWithPrefix();
}
