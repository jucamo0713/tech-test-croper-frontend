export interface AuthUserResponseDto {
  readonly userId: string;
  readonly email: string;
  readonly status?: string;
}

export interface AuthResponseDto {
  readonly user: AuthUserResponseDto;
  readonly sessionToken: string;
  readonly refreshToken: string;
}

