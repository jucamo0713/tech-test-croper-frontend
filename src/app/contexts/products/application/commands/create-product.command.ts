import { Command } from '../../../../core/cqrs';
import { ProductFormModel } from '../../infrastructure/mappers';

export class CreateProductCommand implements Command<void> {
  readonly type = 'products.create';

  constructor(readonly product: ProductFormModel) {}
}

