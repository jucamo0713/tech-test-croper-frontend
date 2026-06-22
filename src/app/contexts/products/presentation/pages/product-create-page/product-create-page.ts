import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppAlert } from '../../../../../shared/components';
import { ProductsFacade } from '../../../application/facades/products.facade';
import { ProductFormModel } from '../../../infrastructure/mappers';
import { ProductForm } from '../../organisms/product-form/product-form';

@Component({
  selector: 'app-product-create-page',
  imports: [AsyncPipe, RouterLink, AppAlert, ProductForm],
  templateUrl: './product-create-page.html',
})
export class ProductCreatePage {
  protected readonly products = inject(ProductsFacade);

  protected save(product: ProductFormModel): void {
    this.products.createProduct(product);
  }
}

