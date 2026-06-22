export interface GetPaginatedProductsQueryDto {
  readonly page?: number;
  readonly limit?: number;
  readonly sortBy?: string;
  readonly sortOrder?: 'asc' | 'desc';
  readonly search?: string;
  readonly status?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly currency?: string;
  readonly createdFrom?: string;
  readonly createdTo?: string;
}
