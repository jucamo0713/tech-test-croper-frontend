import { Query } from '../../../../core/cqrs';
import { ProductSearchCriteria } from '../../domain/models';

export class LoadProductsQuery implements Query<void> {
  readonly type = 'products.load';

  constructor(readonly criteria: ProductSearchCriteria) {}
}

