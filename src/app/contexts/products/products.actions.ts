import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AppError } from '../../core/errors';
import { Product, ProductSearchCriteria } from './domain/models';
import { ProductFormModel } from './infrastructure/mappers';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products Requested': props<{ criteria: ProductSearchCriteria }>(),
    'Load Products Succeeded': props<{
      items: Product[];
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      search: string;
      filters: ProductSearchCriteria;
    }>(),
    'Load Products Failed': props<{ error: AppError }>(),
    'Load Product Detail Requested': props<{ productId: string }>(),
    'Load Product Detail Succeeded': props<{ product: Product }>(),
    'Load Product Detail Failed': props<{ error: AppError }>(),
    'Create Product Requested': props<{ product: ProductFormModel }>(),
    'Update Product Requested': props<{
      productId: string;
      product: ProductFormModel;
    }>(),
    'Save Product Succeeded': props<{ product: Product }>(),
    'Save Product Failed': props<{ error: AppError }>(),
    'Delete Product Requested': props<{ productId: string }>(),
    'Delete Product Succeeded': props<{ productId: string }>(),
    'Delete Product Failed': props<{ error: AppError }>(),
    'Clear Product Feedback': emptyProps(),
  },
});

