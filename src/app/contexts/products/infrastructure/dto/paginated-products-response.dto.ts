import { PaginationMetadata } from '../../../../shared/models';
import { ProductResponseDto } from './product-response.dto';

export interface PaginatedProductsResponseDto {
  readonly data: ProductResponseDto[];
  readonly metadata: PaginationMetadata;
}

