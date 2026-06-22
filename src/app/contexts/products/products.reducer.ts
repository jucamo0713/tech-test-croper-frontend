import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from './products.actions';
import { initialProductsState, ProductsState } from './products.store';

export const productsReducer = createReducer<ProductsState>(
  initialProductsState,
  on(ProductsActions.loadProductsRequested, (state, { criteria }) => ({
    ...state,
    loading: true,
    error: null,
    search: criteria.search ?? '',
    filters: criteria,
  })),
  on(
    ProductsActions.loadProductsSucceeded,
    (state, { items, page, limit, total, totalPages, search, filters }) => ({
      ...state,
      items,
      page,
      limit,
      total,
      totalPages,
      search,
      filters,
      loading: false,
    }),
  ),
  on(ProductsActions.loadProductsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.message,
  })),
  on(ProductsActions.loadProductDetailRequested, (state) => ({
    ...state,
    detailLoading: true,
    error: null,
  })),
  on(ProductsActions.loadProductDetailSucceeded, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    detailLoading: false,
  })),
  on(ProductsActions.loadProductDetailFailed, (state, { error }) => ({
    ...state,
    detailLoading: false,
    error: error.message,
  })),
  on(
    ProductsActions.createProductRequested,
    ProductsActions.updateProductRequested,
    (state) => ({
      ...state,
      saving: true,
      error: null,
      success: null,
    }),
  ),
  on(ProductsActions.saveProductSucceeded, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    saving: false,
    success: 'Product saved',
  })),
  on(ProductsActions.saveProductFailed, (state, { error }) => ({
    ...state,
    saving: false,
    error: error.message,
  })),
  on(ProductsActions.deleteProductRequested, (state) => ({
    ...state,
    deleting: true,
    error: null,
  })),
  on(ProductsActions.deleteProductSucceeded, (state, { productId }) => ({
    ...state,
    deleting: false,
    selectedProduct:
      state.selectedProduct?.productId === productId
        ? null
        : state.selectedProduct,
    items: state.items.filter((item) => item.productId !== productId),
    success: 'Product deleted',
  })),
  on(ProductsActions.deleteProductFailed, (state, { error }) => ({
    ...state,
    deleting: false,
    error: error.message,
  })),
  on(ProductsActions.clearProductFeedback, (state) => ({
    ...state,
    error: null,
    success: null,
  })),
);

