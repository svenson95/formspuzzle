import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'start',
    loadComponent: () =>
      import('./pages/start/start.page').then((m) => m.StartPage),
  },
  {
    path: 'choose-map',
    loadComponent: () =>
      import('./pages/choose-map/choose-map.page').then((m) => m.ChooseMapPage),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./pages/game/game.page').then((m) => m.GamePage),
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
];
