import { PriceMap, TranslatableText } from '../../../../shared/value-objects';

export interface ProductResponseDto {
  readonly productId: string;
  readonly name: TranslatableText;
  readonly description?: TranslatableText;
  readonly prices: PriceMap;
  readonly status?: string;
}

