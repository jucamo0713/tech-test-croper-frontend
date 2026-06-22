import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCTS_FEATURE_KEY, ProductsState } from './products.store';

export const selectProductsState =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.items,
);

export const selectSelectedProduct = createSelector(
  selectProductsState,
  (state) => state.selectedProduct,
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading,
);

export const selectProductDetailLoading = createSelector(
  selectProductsState,
  (state) => state.detailLoading,
);

export const selectProductSaving = createSelector(
  selectProductsState,
  (state) => state.saving,
);

export const selectProductDeleting = createSelector(
  selectProductsState,
  (state) => state.deleting,
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error,
);

export const selectProductsSuccess = createSelector(
  selectProductsState,
  (state) => state.success,
);

export const selectProductsPagination = createSelector(
  selectProductsState,
  (state) => ({
    page: state.page,
    limit: state.limit,
    total: state.total,
    totalPages: state.totalPages,
  }),
);

export const selectProductsCriteria = createSelector(
  selectProductsState,
  (state) => state.filters,
);

