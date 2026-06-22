import { PriceMap, TranslatableText } from '../../../../shared/value-objects';
import { Pagination } from '../../../../shared/models';

export interface Product {
  readonly productId: string;
  readonly name: TranslatableText;
  readonly description?: TranslatableText;
  readonly prices: PriceMap;
  readonly status?: string;
}

export type ProductSortOrder = 'asc' | 'desc';

export interface ProductFilters {
  readonly status?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly currency?: string;
  readonly createdFrom?: string;
  readonly createdTo?: string;
}

export interface ProductSearchCriteria extends ProductFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
  readonly sortBy?: string;
  readonly sortOrder?: ProductSortOrder;
}

export type PaginatedProducts = Pagination<Product>;
