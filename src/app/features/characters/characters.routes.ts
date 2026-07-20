import type { Route } from '@angular/router';
import { Characters } from './pages/characters/characters';

export const CHARACTERS_ROUTES: Route[] = [
  {
    path: '',
    component: Characters,
  },
];
