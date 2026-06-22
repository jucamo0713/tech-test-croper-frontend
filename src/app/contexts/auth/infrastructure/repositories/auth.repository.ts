import { Injectable, inject } from '@angular/core';
import { AuthSession } from '../../domain/models';
import { AuthApiService } from '../api/auth-api.service';
import { AuthMapper } from '../mappers';

@Injectable({ providedIn: 'root' })
export class AuthRepository {
  private readonly api = inject(AuthApiService);

  async login(email: string, password: string): Promise<AuthSession> {
    return AuthMapper.toSession(await this.api.login({ email, password }));
  }

  async register(email: string, password: string): Promise<AuthSession> {
    return AuthMapper.toSession(await this.api.register({ email, password }));
  }
}

