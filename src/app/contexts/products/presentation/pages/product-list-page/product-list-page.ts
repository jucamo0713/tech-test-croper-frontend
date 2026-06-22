import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppAlert, AppButton, AppLoader } from '../../../../../shared/components';
import { ProductSearchCriteria } from '../../../domain/models';
import { ProductsFacade } from '../../../application/facades/products.facade';
import { ProductCard } from '../../molecules/product-card/product-card';
import { ProductFilters } from '../../molecules/product-filters/product-filters';

@Component({
  selector: 'app-product-list-page',
  imports: [
    AsyncPipe,
    RouterLink,
    AppAlert,
    AppButton,
    AppLoader,
    ProductCard,
    ProductFilters,
  ],
  templateUrl: './product-list-page.html',
})
export class ProductListPage implements OnInit {
  protected readonly products = inject(ProductsFacade);
  private criteria: ProductSearchCriteria = { page: 1, limit: 10 };

  ngOnInit(): void {
    this.products.loadProducts(this.criteria);
  }

  protected search(criteria: ProductSearchCriteria): void {
    this.criteria = { ...criteria };
    this.products.loadProducts(this.criteria);
  }

  protected previousPage(currentPage: number): void {
    if (currentPage <= 1) {
      return;
    }

    this.loadPage(currentPage - 1);
  }

  protected nextPage(currentPage: number, totalPages: number): void {
    if (currentPage >= totalPages) {
      return;
    }

    this.loadPage(currentPage + 1);
  }

  private loadPage(page: number): void {
    this.criteria = {
      ...this.criteria,
      page,
      limit: this.criteria.limit ?? 10,
    };
    this.products.loadProducts(this.criteria);
  }
}
