import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CqrsCallerService } from '../../../../core/cqrs';
import { ProductSearchCriteria } from '../../domain/models';
import { ProductFormModel } from '../../infrastructure/mappers';
import {
  selectProductDeleting,
  selectProductDetailLoading,
  selectProductSaving,
  selectProducts,
  selectProductsCriteria,
  selectProductsError,
  selectProductsLoading,
  selectProductsPagination,
  selectProductsSuccess,
  selectSelectedProduct,
} from '../../products.selectors';
import {
  CreateProductCommand,
  DeleteProductCommand,
  UpdateProductCommand,
} from '../commands';
import { LoadProductDetailQuery, LoadProductsQuery } from '../queries';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  private readonly store = inject(Store);
  private readonly cqrs = inject(CqrsCallerService);

  readonly products$ = this.store.select(selectProducts);
  readonly selectedProduct$ = this.store.select(selectSelectedProduct);
  readonly loading$ = this.store.select(selectProductsLoading);
  readonly detailLoading$ = this.store.select(selectProductDetailLoading);
  readonly saving$ = this.store.select(selectProductSaving);
  readonly deleting$ = this.store.select(selectProductDeleting);
  readonly error$ = this.store.select(selectProductsError);
  readonly success$ = this.store.select(selectProductsSuccess);
  readonly pagination$ = this.store.select(selectProductsPagination);
  readonly criteria$ = this.store.select(selectProductsCriteria);

  loadProducts(criteria: ProductSearchCriteria = {}): void {
    this.cqrs.query(new LoadProductsQuery({ page: 1, limit: 10, ...criteria })).subscribe();
  }

  loadProductDetail(productId: string): void {
    this.cqrs.query(new LoadProductDetailQuery(productId)).subscribe();
  }

  createProduct(product: ProductFormModel): void {
    this.cqrs.dispatch(new CreateProductCommand(product)).subscribe();
  }

  updateProduct(productId: string, product: ProductFormModel): void {
    this.cqrs.dispatch(new UpdateProductCommand(productId, product)).subscribe();
  }

  deleteProduct(productId: string): void {
    this.cqrs.dispatch(new DeleteProductCommand(productId)).subscribe();
  }
}

