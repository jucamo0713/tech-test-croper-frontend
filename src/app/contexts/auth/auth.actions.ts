import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AppError } from '../../core/errors';
import { AuthSession } from './domain/models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Requested': props<{ email: string; password: string }>(),
    'Register Requested': props<{ email: string; password: string }>(),
    'Auth Succeeded': props<{ session: AuthSession }>(),
    'Auth Failed': props<{ error: AppError }>(),
    'Auth Request Finished': emptyProps(),
    'Logout': emptyProps(),
  },
});
