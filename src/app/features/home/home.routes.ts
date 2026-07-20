import type { Route } from '@angular/router';
import { ROOT_PATHS } from '../../core/constants/paths.constants';
import { Home } from './home';

export const HOME_ROUTES: Route[] = [
  {
    path: ROOT_PATHS.base,
    component: Home,
  },
];
