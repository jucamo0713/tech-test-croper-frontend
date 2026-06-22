import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommandHandler, QueryHandler } from '../../../../core/cqrs';
import { ProductsActions } from '../../products.actions';
import {
  CreateProductCommand,
  DeleteProductCommand,
  UpdateProductCommand,
} from '../commands';
import { LoadProductDetailQuery, LoadProductsQuery } from '../queries';

@Injectable()
export class LoadProductsQueryHandler
  implements QueryHandler<LoadProductsQuery, void>
{
  readonly queryType = 'products.load';
  private readonly store = inject(Store);

  execute(query: LoadProductsQuery): void {
    this.store.dispatch(
      ProductsActions.loadProductsRequested({ criteria: query.criteria }),
    );
  }
}

@Injectable()
export class LoadProductDetailQueryHandler
  implements QueryHandler<LoadProductDetailQuery, void>
{
  readonly queryType = 'products.load-detail';
  private readonly store = inject(Store);

  execute(query: LoadProductDetailQuery): void {
    this.store.dispatch(
      ProductsActions.loadProductDetailRequested({
        productId: query.productId,
      }),
    );
  }
}

@Injectable()
export class CreateProductCommandHandler
  implements CommandHandler<CreateProductCommand, void>
{
  readonly commandType = 'products.create';
  private readonly store = inject(Store);

  execute(command: CreateProductCommand): void {
    this.store.dispatch(
      ProductsActions.createProductRequested({ product: command.product }),
    );
  }
}

@Injectable()
export class UpdateProductCommandHandler
  implements CommandHandler<UpdateProductCommand, void>
{
  readonly commandType = 'products.update';
  private readonly store = inject(Store);

  execute(command: UpdateProductCommand): void {
    this.store.dispatch(
      ProductsActions.updateProductRequested({
        productId: command.productId,
        product: command.product,
      }),
    );
  }
}

@Injectable()
export class DeleteProductCommandHandler
  implements CommandHandler<DeleteProductCommand, void>
{
  readonly commandType = 'products.delete';
  private readonly store = inject(Store);

  execute(command: DeleteProductCommand): void {
    this.store.dispatch(
      ProductsActions.deleteProductRequested({ productId: command.productId }),
    );
  }
}

