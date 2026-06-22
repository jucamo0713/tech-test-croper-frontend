import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './contexts/auth/routes';
import { PRODUCTS_ROUTES } from './contexts/products/routes';

export const routes: Routes = [
  ...AUTH_ROUTES,
  ...PRODUCTS_ROUTES,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
