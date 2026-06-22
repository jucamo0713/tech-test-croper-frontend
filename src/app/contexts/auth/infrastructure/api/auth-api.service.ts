import { Injectable, inject } from '@angular/core';
import { HttpClient } from '../../../../shared/http';
import { AuthResponseDto, LoginRequestDto, RegisterRequestDto } from '../dto';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  login(payload: LoginRequestDto): Promise<AuthResponseDto> {
    return this.http.post<AuthResponseDto, LoginRequestDto>('/auth/login', payload);
  }

  register(payload: RegisterRequestDto): Promise<AuthResponseDto> {
    return this.http.post<AuthResponseDto, RegisterRequestDto>(
      '/auth/register',
      payload,
    );
  }
}

