import { Command } from '../../../../core/cqrs';

export class RegisterCommand implements Command<void> {
  readonly type = 'auth.register';

  constructor(
    readonly email: string,
    readonly password: string,
  ) {}
}

