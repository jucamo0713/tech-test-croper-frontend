import { Product } from '../../domain/models';
import {
  CreateProductRequestDto,
  PaginatedProductsResponseDto,
  ProductResponseDto,
  UpdateProductRequestDto,
} from '../dto';

export class ProductMapper {
  static toProduct(dto: ProductResponseDto): Product {
    return {
      productId: dto.productId,
      name: { ...dto.name },
      description: dto.description ? { ...dto.description } : undefined,
      prices: { ...dto.prices },
      status: dto.status,
    };
  }

  static toPaginatedProducts(dto: PaginatedProductsResponseDto) {
    return {
      data: dto.data.map((item) => this.toProduct(item)),
      metadata: dto.metadata,
    };
  }

  static toCreateDto(product: ProductFormModel): CreateProductRequestDto {
    return {
      name: product.name,
      description: product.description,
      prices: product.prices,
      status: product.status || undefined,
    };
  }

  static toUpdateDto(product: ProductFormModel): UpdateProductRequestDto {
    return this.toCreateDto(product);
  }
}

export interface ProductFormModel {
  readonly name: Record<string, string>;
  readonly description?: Record<string, string>;
  readonly prices: Record<string, number>;
  readonly status?: string;
}

