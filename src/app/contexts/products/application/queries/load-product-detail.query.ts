import { Query } from '../../../../core/cqrs';

export class LoadProductDetailQuery implements Query<void> {
  readonly type = 'products.load-detail';

  constructor(readonly productId: string) {}
}

