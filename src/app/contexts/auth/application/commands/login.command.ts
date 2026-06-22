import { Command } from '../../../../core/cqrs';

export class LoginCommand implements Command<void> {
  readonly type = 'auth.login';

  constructor(
    readonly email: string,
    readonly password: string,
  ) {}
}

