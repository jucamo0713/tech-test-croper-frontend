import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppAlert, AppLoader } from '../../../../../shared/components';
import { ProductsFacade } from '../../../application/facades/products.facade';
import { ProductFormModel } from '../../../infrastructure/mappers';
import { ProductForm } from '../../organisms/product-form/product-form';

@Component({
  selector: 'app-product-edit-page',
  imports: [AsyncPipe, RouterLink, AppAlert, AppLoader, ProductForm],
  templateUrl: './product-edit-page.html',
})
export class ProductEditPage implements OnInit {
  protected readonly products = inject(ProductsFacade);
  private readonly route = inject(ActivatedRoute);
  private productId = '';

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId') ?? '';
    if (this.productId) {
      this.products.loadProductDetail(this.productId);
    }
  }

  protected save(product: ProductFormModel): void {
    this.products.updateProduct(this.productId, product);
  }
}

