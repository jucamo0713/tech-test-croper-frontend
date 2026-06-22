import { Command } from '../../../../core/cqrs';
import { ProductFormModel } from '../../infrastructure/mappers';

export class UpdateProductCommand implements Command<void> {
  readonly type = 'products.update';

  constructor(
    readonly productId: string,
    readonly product: ProductFormModel,
  ) {}
}

