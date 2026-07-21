import { Routes } from '@angular/router';
import { ERROR_URLS } from './core/constants/urls.constants';
import { LOCATIONS_PATHS, CHARACTERS_PATHS, EPISODES_PATHS, ERROR_PATHS, ROOT_PATHS } from './core/constants/paths.constants';
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
  path: LOCATIONS_PATHS.base,
  loadChildren: async () =>
    import('./features/locations/locations.routes').then((module) => module.LOCATIONS_ROUTES),
  },
  {
    path: EPISODES_PATHS.base,
    loadChildren: async () =>
      import('./features/episodes/episodes.routes').then((module) => module.EPISODES_ROUTES),
  },
  {
    path: ERROR_PATHS.base,
    loadChildren: async () =>
      import('./features/error/error.routes').then((module) => module.ERROR_ROUTES),
  },
  /* Il faut le mettre en dernier, puisque qu'il bloque l'affichage des pages s'ils se trouvent avant elles */
  {
    path: '**',
    redirectTo: ERROR_URLS.notFound,
  },
];
