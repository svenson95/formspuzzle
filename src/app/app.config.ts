import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app.routes';

const ROUTE_REUSE_STRATEGY = {
  provide: RouteReuseStrategy,
  useClass: IonicRouteStrategy,
};

const IONIC_PROVIDERS = [ROUTE_REUSE_STRATEGY, provideIonicAngular()];

export const appConfig = {
  providers: [
    ...IONIC_PROVIDERS,
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
};
