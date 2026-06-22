import { Injectable, inject } from '@angular/core';
import { PaginatedProducts, Product, ProductSearchCriteria } from '../../domain/models';
import { ProductsApiService } from '../api/products-api.service';
import { ProductFormModel, ProductMapper } from '../mappers';

@Injectable({ providedIn: 'root' })
export class ProductsRepository {
  private readonly api = inject(ProductsApiService);

  async findPaginated(criteria: ProductSearchCriteria): Promise<PaginatedProducts> {
    return ProductMapper.toPaginatedProducts(await this.api.findPaginated(criteria));
  }

  async findById(productId: string): Promise<Product> {
    return ProductMapper.toProduct(await this.api.findById(productId));
  }

  async create(product: ProductFormModel): Promise<Product> {
    return ProductMapper.toProduct(
      await this.api.create(ProductMapper.toCreateDto(product)),
    );
  }

  async update(productId: string, product: ProductFormModel): Promise<Product> {
    return ProductMapper.toProduct(
      await this.api.update(productId, ProductMapper.toUpdateDto(product)),
    );
  }

  delete(productId: string): Promise<void> {
    return this.api.delete(productId);
  }
}

