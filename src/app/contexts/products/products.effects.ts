import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { ErrorMapper } from '../../core/errors';
import { ProductsRepository } from './infrastructure/repositories/products.repository';
import { ProductsActions } from './products.actions';

@Injectable()
export class ProductsEffects {
  private readonly actions$ = inject(Actions);
  private readonly repository = inject(ProductsRepository);
  private readonly router = inject(Router);

  readonly loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductsRequested),
      switchMap(({ criteria }) =>
        from(this.repository.findPaginated(criteria)).pipe(
          map((result) =>
            ProductsActions.loadProductsSucceeded({
              items: result.data,
              page: result.metadata.page,
              limit: result.metadata.limit,
              total: result.metadata.totalItems,
              totalPages: result.metadata.totalPages,
              search: criteria.search ?? '',
              filters: criteria,
            }),
          ),
          catchError((error: unknown) =>
            of(
              ProductsActions.loadProductsFailed({
                error: ErrorMapper.fromUnknown(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly loadProductDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductDetailRequested),
      switchMap(({ productId }) =>
        from(this.repository.findById(productId)).pipe(
          map((product) =>
            ProductsActions.loadProductDetailSucceeded({ product }),
          ),
          catchError((error: unknown) =>
            of(
              ProductsActions.loadProductDetailFailed({
                error: ErrorMapper.fromUnknown(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProductRequested),
      switchMap(({ product }) =>
        from(this.repository.create(product)).pipe(
          map((savedProduct) =>
            ProductsActions.saveProductSucceeded({ product: savedProduct }),
          ),
          catchError((error: unknown) =>
            of(
              ProductsActions.saveProductFailed({
                error: ErrorMapper.fromUnknown(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProductRequested),
      switchMap(({ productId, product }) =>
        from(this.repository.update(productId, product)).pipe(
          map((savedProduct) =>
            ProductsActions.saveProductSucceeded({ product: savedProduct }),
          ),
          catchError((error: unknown) =>
            of(
              ProductsActions.saveProductFailed({
                error: ErrorMapper.fromUnknown(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProductRequested),
      switchMap(({ productId }) =>
        from(this.repository.delete(productId)).pipe(
          map(() => ProductsActions.deleteProductSucceeded({ productId })),
          catchError((error: unknown) =>
            of(
              ProductsActions.deleteProductFailed({
                error: ErrorMapper.fromUnknown(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly navigateAfterSave$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.saveProductSucceeded),
        tap(({ product }) => {
          void this.router.navigate(['/products', product.productId]);
        }),
      ),
    { dispatch: false },
  );

  readonly navigateAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.deleteProductSucceeded),
        tap(() => {
          void this.router.navigate(['/products']);
        }),
      ),
    { dispatch: false },
  );
}

