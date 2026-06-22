import { Product, ProductSearchCriteria } from './domain/models';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState {
  readonly items: Product[];
  readonly selectedProduct: Product | null;
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly search: string;
  readonly filters: ProductSearchCriteria;
  readonly loading: boolean;
  readonly detailLoading: boolean;
  readonly saving: boolean;
  readonly deleting: boolean;
  readonly error: string | null;
  readonly success: string | null;
}

export const initialProductsState: ProductsState = {
  items: [],
  selectedProduct: null,
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  search: '',
  filters: {},
  loading: false,
  detailLoading: false,
  saving: false,
  deleting: false,
  error: null,
  success: null,
};

