import { AsyncPipe, CurrencyPipe, KeyValuePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AppAlert,
  AppButton,
  AppLoader,
  ConfirmationModal,
} from '../../../../../shared/components';
import { TranslatableTextPipe } from '../../../../../shared/pipes';
import { ProductsFacade } from '../../../application/facades/products.facade';

@Component({
  selector: 'app-product-detail-page',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    KeyValuePipe,
    RouterLink,
    AppAlert,
    AppButton,
    AppLoader,
    ConfirmationModal,
    TranslatableTextPipe,
  ],
  templateUrl: './product-detail-page.html',
})
export class ProductDetailPage implements OnInit {
  protected readonly products = inject(ProductsFacade);
  private readonly route = inject(ActivatedRoute);
  protected readonly confirmOpen = signal(false);

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.products.loadProductDetail(productId);
    }
  }

  protected delete(productId: string): void {
    this.products.deleteProduct(productId);
  }
}
