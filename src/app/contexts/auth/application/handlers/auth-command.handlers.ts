import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommandHandler } from '../../../../core/cqrs';
import { AuthActions } from '../../auth.actions';
import { LoginCommand, RegisterCommand } from '../commands';

@Injectable()
export class LoginCommandHandler implements CommandHandler<LoginCommand, void> {
  readonly commandType = 'auth.login';
  private readonly store = inject(Store);

  execute(command: LoginCommand): void {
    this.store.dispatch(
      AuthActions.loginRequested({
        email: command.email,
        password: command.password,
      }),
    );
  }
}

@Injectable()
export class RegisterCommandHandler
  implements CommandHandler<RegisterCommand, void>
{
  readonly commandType = 'auth.register';
  private readonly store = inject(Store);

  execute(command: RegisterCommand): void {
    this.store.dispatch(
      AuthActions.registerRequested({
        email: command.email,
        password: command.password,
      }),
    );
  }
}

