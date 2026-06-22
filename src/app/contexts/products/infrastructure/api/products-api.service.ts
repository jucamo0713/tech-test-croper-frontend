import { Injectable, inject } from '@angular/core';
import { HttpClient } from '../../../../shared/http';
import {
  CreateProductRequestDto,
  GetPaginatedProductsQueryDto,
  PaginatedProductsResponseDto,
  ProductResponseDto,
  UpdateProductRequestDto,
} from '../dto';

@Injectable({ providedIn: 'root' })
export class ProductsApiService {
  private readonly http = inject(HttpClient);

  findPaginated(
    params: GetPaginatedProductsQueryDto,
  ): Promise<PaginatedProductsResponseDto> {
    return this.http.get<PaginatedProductsResponseDto>('/products', { params });
  }

  findById(productId: string): Promise<ProductResponseDto> {
    return this.http.get<ProductResponseDto>(`/products/${productId}`);
  }

  create(payload: CreateProductRequestDto): Promise<ProductResponseDto> {
    return this.http.post<ProductResponseDto, CreateProductRequestDto>(
      '/products',
      payload,
    );
  }

  update(
    productId: string,
    payload: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.http.patch<ProductResponseDto, UpdateProductRequestDto>(
      `/products/${productId}`,
      payload,
    );
  }

  delete(productId: string): Promise<void> {
    return this.http.delete<void>(`/products/${productId}`);
  }
}

