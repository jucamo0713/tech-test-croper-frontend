import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppButton } from '../../../../../shared/components';
import { ProductSearchCriteria } from '../../../domain/models';

@Component({
  selector: 'app-product-filters',
  imports: [ReactiveFormsModule, AppButton],
  templateUrl: './product-filters.html',
})
export class ProductFilters {
  readonly search = output<ProductSearchCriteria>();
  protected readonly form = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    status: new FormControl('', { nonNullable: true }),
    currency: new FormControl('', { nonNullable: true }),
    minPrice: new FormControl<number | null>(null),
    maxPrice: new FormControl<number | null>(null),
    createdFrom: new FormControl('', { nonNullable: true }),
    createdTo: new FormControl('', { nonNullable: true }),
  });

  protected submit(): void {
    const value = this.form.getRawValue();
    this.search.emit({
      search: value.search || undefined,
      status: value.status || undefined,
      currency: value.currency || undefined,
      minPrice: value.minPrice ?? undefined,
      maxPrice: value.maxPrice ?? undefined,
      createdFrom: this.toIsoDateStart(value.createdFrom),
      createdTo: this.toIsoDateEnd(value.createdTo),
      page: 1,
      limit: 10,
    });
  }

  private toIsoDateStart(value: string): string | undefined {
    return value ? new Date(`${value}T00:00:00.000Z`).toISOString() : undefined;
  }

  private toIsoDateEnd(value: string): string | undefined {
    return value ? new Date(`${value}T23:59:59.999Z`).toISOString() : undefined;
  }
}
