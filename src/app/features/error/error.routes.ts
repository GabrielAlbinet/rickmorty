import { Route } from '@angular/router';
import { ERROR_PATHS } from '../../core/constants/paths.constants';
import { PageNotFound } from './page-not-found/page-not-found';

export const ERROR_ROUTES: Route[] = [{ path: ERROR_PATHS.notFound, component: PageNotFound }];
