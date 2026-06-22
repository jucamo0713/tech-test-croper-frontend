import { Routes } from '@angular/router';
import { authGuard } from '../auth/application/guards';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: 'products',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./presentation/pages/product-list-page/product-list-page').then(
            (m) => m.ProductListPage,
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './presentation/pages/product-create-page/product-create-page'
          ).then((m) => m.ProductCreatePage),
      },
      {
        path: ':productId',
        loadComponent: () =>
          import(
            './presentation/pages/product-detail-page/product-detail-page'
          ).then((m) => m.ProductDetailPage),
      },
      {
        path: ':productId/edit',
        loadComponent: () =>
          import('./presentation/pages/product-edit-page/product-edit-page').then(
            (m) => m.ProductEditPage,
          ),
      },
    ],
  },
];
