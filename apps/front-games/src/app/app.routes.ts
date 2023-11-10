import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(
        ({ HomeComponent }) => HomeComponent
      ),
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./games/games.component').then(
        ({ GamesComponent }) => GamesComponent
      ),
  },
];
