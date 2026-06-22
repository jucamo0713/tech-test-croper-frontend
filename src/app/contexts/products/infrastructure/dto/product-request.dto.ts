import { PriceMap, TranslatableText } from '../../../../shared/value-objects';

export interface CreateProductRequestDto {
  readonly name: TranslatableText;
  readonly description?: TranslatableText;
  readonly prices: PriceMap;
  readonly status?: string;
}

export type UpdateProductRequestDto = Partial<CreateProductRequestDto>;

