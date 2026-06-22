import { Command } from '../../../../core/cqrs';

export class DeleteProductCommand implements Command<void> {
  readonly type = 'products.delete';

  constructor(readonly productId: string) {}
}

