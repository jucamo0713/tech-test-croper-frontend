import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatableTextPipe } from '../../../../../shared/pipes';
import { LocaleService } from '../../../../../shared/i18n';
import { Product } from '../../../domain/models';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, TranslatableTextPipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();
  private readonly locale = inject(LocaleService);

  protected primaryPrice(): { currency: string; value: number } | null {
    const prices = this.product().prices;
    const preferredCurrency = this.locale.currentLocale.startsWith('es')
      ? 'COP'
      : 'USD';
    const preferredPrice = prices[preferredCurrency];

    if (typeof preferredPrice === 'number') {
      return { currency: preferredCurrency, value: preferredPrice };
    }

    const [currency, value] = Object.entries(prices)[0] ?? [];
    return currency && typeof value === 'number' ? { currency, value } : null;
  }
}
