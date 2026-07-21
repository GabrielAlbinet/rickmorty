import type {Route} from '@angular/router';
import {Episodes} from './pages/episodes/episodes';

export const EPISODES_ROUTES: Route[] = [
  {
    path: '',
    component: Episodes,
  },
];