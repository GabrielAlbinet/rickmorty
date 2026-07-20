import { Routes } from '@angular/router';
import { ERROR_URLS } from './core/constants/urls.constants';
import { CHARACTERS_PATHS, ERROR_PATHS, ROOT_PATHS } from './core/constants/paths.constants';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: ROOT_PATHS.base,
    loadChildren: async () =>
      import('./features/home/home.routes').then((module) => module.HOME_ROUTES),
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: CHARACTERS_PATHS.base,
    loadChildren: async () =>
      import('./features/characters/characters.routes').then((module) => module.CHARACTERS_ROUTES),
  },
  {
    path: ERROR_PATHS.base,
    loadChildren: async () =>
      import('./features/error/error.routes').then((module) => module.ERROR_ROUTES),
  },
  {
    path: '**',
    redirectTo: ERROR_URLS.notFound,
  },
];
